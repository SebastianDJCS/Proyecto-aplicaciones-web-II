from decimal import Decimal

from django.db import transaction
from django.db.models import Count, DecimalField, F, Sum
from django.db.models.functions import Coalesce
from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

import pandas as pd
import io

from .models import Compra, Categoria, DetalleCompra, ListaPrecio, ListaPrecioItem, Producto, Proveedor, TurnoCaja, Usuario, Venta, EstadoSync, ROL_ADMINISTRADOR
from .permissions import IsAdministrador, IsAdministradorOReadOnly, IsAdministradorOVendedor
from .serializers import (
    CompraSerializer,
    DashboardResumenSerializer,
    CategoriaSerializer,
    DetalleCompraSerializer,
    ListaPrecioItemSerializer,
    ListaPrecioSerializer,
    ProductoSerializer,
    ProveedorSerializer,
    SyncPayloadSerializer,
    TurnoCajaCierreSerializer,
    TurnoCajaSerializer,
    UsuarioSerializer,
    VentaSerializer,
)


class AdministradorOnlyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdministrador]


# Busca esta parte en views.py
class UsuarioViewSet(viewsets.ModelViewSet): # Cambia temporalmente la herencia si es necesario
    queryset = Usuario.objects.all().order_by("username")
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated] # Solo requiere estar logueado

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Devuelve los datos del usuario autenticado (ruta: /usuarios/me/)."""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def login_status(self, request):
        """Actualiza el estado de sesión del usuario."""
        usuario = request.user
        usuario.is_logged_in = True
        usuario.save(update_fields=["is_logged_in"])
        return Response({"status": "logged_in", "is_logged_in": True})

    @action(detail=False, methods=["post"], permission_classes=[IsAuthenticated])
    def logout_status(self, request):
        """Marca al usuario como desconectado."""
        usuario = request.user
        usuario.is_logged_in = False
        usuario.save(update_fields=["is_logged_in"])
        return Response({"status": "logged_out", "is_logged_in": False})

class ProveedorViewSet(viewsets.ModelViewSet):
    queryset = Proveedor.objects.all().order_by("nombre")
    serializer_class = ProveedorSerializer
    permission_classes = [IsAdministradorOReadOnly]


class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all().order_by("nombre")
    serializer_class = CategoriaSerializer
    permission_classes = [IsAdministradorOReadOnly]


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.select_related("proveedor").all().order_by("nombre")
    serializer_class = ProductoSerializer
    permission_classes = [IsAdministradorOReadOnly]


class ListaPrecioViewSet(viewsets.ModelViewSet):
    queryset = ListaPrecio.objects.prefetch_related("items__producto").all().order_by("nombre")
    serializer_class = ListaPrecioSerializer
    permission_classes = [IsAdministradorOReadOnly]


class ListaPrecioItemViewSet(viewsets.ModelViewSet):
    queryset = ListaPrecioItem.objects.select_related("lista_precio", "producto").all().order_by(
        "lista_precio__nombre", "producto__nombre"
    )
    serializer_class = ListaPrecioItemSerializer
    permission_classes = [IsAdministradorOReadOnly]


class TurnoCajaViewSet(viewsets.ModelViewSet):
    serializer_class = TurnoCajaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = TurnoCaja.objects.select_related("usuario").all().order_by("-fecha_apertura")
        user = self.request.user
        if user.is_authenticated and getattr(user, "rol", None) != ROL_ADMINISTRADOR:
            queryset = queryset.filter(usuario=user)
        return queryset

    def get_permissions(self):
        if self.action in {"create", "cerrar", "partial_update", "update", "destroy"}:
            return [IsAdministradorOVendedor()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=True, methods=["post"])
    def cerrar(self, request, pk=None):
        turno = self.get_object()
        if request.user.rol != ROL_ADMINISTRADOR and turno.usuario_id != request.user.id:
            return Response({"detail": "No puedes cerrar un turno ajeno."}, status=status.HTTP_403_FORBIDDEN)

        serializer = TurnoCajaCierreSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        turno.cerrar(
            monto_cierre=serializer.validated_data.get("monto_cierre"),
            observaciones=serializer.validated_data.get("observaciones", ""),
        )
        return Response(self.get_serializer(turno).data)


class VentaViewSet(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    permission_classes = [IsAdministradorOVendedor]

    def get_queryset(self):
        queryset = Venta.objects.select_related("turno_caja", "vendedor", "turno_caja__usuario").prefetch_related(
            "detalles__producto"
        )
        user = self.request.user
        if user.is_authenticated and getattr(user, "rol", None) != ROL_ADMINISTRADOR:
            queryset = queryset.filter(vendedor=user)
        return queryset.order_by("-fecha_venta")

    @action(detail=True, methods=["post"])
    def anular(self, request, pk=None):
        venta = self.get_object()
        if request.user.rol != ROL_ADMINISTRADOR and venta.vendedor_id != request.user.id:
            return Response({"detail": "No puedes anular una venta ajena."}, status=status.HTTP_403_FORBIDDEN)

        motivo = request.data.get("motivo", "")
        venta.anular(motivo=motivo)
        return Response(self.get_serializer(venta).data)


class CompraViewSet(viewsets.ModelViewSet):
    queryset = Compra.objects.select_related("proveedor", "usuario").all().order_by("-fecha_compra")
    serializer_class = CompraSerializer
    permission_classes = [IsAdministradorOReadOnly]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class DetalleCompraViewSet(viewsets.ModelViewSet):
    queryset = DetalleCompra.objects.select_related("compra", "producto").all().order_by("created_at")
    serializer_class = DetalleCompraSerializer
    permission_classes = [IsAdministradorOReadOnly]


class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAdministradorOVendedor]

    def list(self, request):
        base_ventas = Venta.objects.filter(estado=Venta.ESTADO_PAGADA)
        base_compras = Compra.objects.all()
        base_turnos = TurnoCaja.objects.all()

        if request.user.rol != ROL_ADMINISTRADOR:
            base_ventas = base_ventas.filter(vendedor=request.user)
            base_compras = base_compras.filter(usuario=request.user)
            base_turnos = base_turnos.filter(usuario=request.user)

        hoy = timezone.localdate()

        resumen = {
            "productos": Producto.objects.filter(activo=True).count(),
            "productos_stock_bajo": Producto.objects.filter(activo=True, stock_actual__lte=F("stock_minimo")).count(),
            "ventas_hoy": base_ventas.filter(fecha_venta__date=hoy).count(),
            "total_ventas_hoy": base_ventas.filter(fecha_venta__date=hoy).aggregate(
                total=Coalesce(Sum("total"), Decimal("0.00"), output_field=DecimalField(max_digits=12, decimal_places=2))
            )["total"],
            "turnos_abiertos": base_turnos.filter(estado=TurnoCaja.ESTADO_ABIERTO).count(),
            "compras_hoy": base_compras.filter(fecha_compra__date=hoy).count(),
        }
        serializer = DashboardResumenSerializer(resumen)
        return Response(serializer.data)


class SyncViewSet(viewsets.ViewSet):
    permission_classes = [IsAdministradorOVendedor]

    def create(self, request):
        serializer = SyncPayloadSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        payload = serializer.validated_data

        with transaction.atomic():
            ack = {
                "proveedores": self._sync_items(ProveedorSerializer, payload.get("proveedores", [])),
                "productos": self._sync_items(ProductoSerializer, payload.get("productos", []), drop_stock_on_update=True),
                "listas_precio": self._sync_items(ListaPrecioSerializer, payload.get("listas_precio", [])),
                "listas_precio_items": self._sync_items(ListaPrecioItemSerializer, payload.get("listas_precio_items", [])),
                "turnos_caja": self._sync_turnos(payload.get("turnos_caja", [])),
                "ventas": self._sync_ventas(payload.get("ventas", [])),
                "compras": self._sync_compras(payload.get("compras", [])),
            }

        last_sync = payload.get("last_sync")
        response = {
            "server_time": timezone.now(),
            "ack": ack,
            "changes": {
                "proveedores": ProveedorSerializer(self._changed_queryset(Proveedor, last_sync), many=True).data,
                "productos": ProductoSerializer(self._changed_queryset(Producto, last_sync), many=True).data,
                "listas_precio": ListaPrecioSerializer(self._changed_queryset(ListaPrecio, last_sync), many=True).data,
                "listas_precio_items": ListaPrecioItemSerializer(self._changed_queryset(ListaPrecioItem, last_sync), many=True).data,
                "turnos_caja": TurnoCajaSerializer(self._changed_queryset(TurnoCaja, last_sync), many=True).data,
                "ventas": VentaSerializer(self._changed_queryset(Venta, last_sync), many=True).data,
                "compras": CompraSerializer(self._changed_queryset(Compra, last_sync), many=True).data,
            },
        }
        return Response(response)

    def _changed_queryset(self, model, last_sync):
        queryset = model.objects.all().order_by("updated_at")
        if last_sync:
            queryset = queryset.filter(updated_at__gt=last_sync)
        user = self.request.user
        if getattr(user, "rol", None) != ROL_ADMINISTRADOR and model in {Venta, Compra, TurnoCaja}:
            if model is Venta:
                queryset = queryset.filter(vendedor=user)
            elif model is Compra:
                queryset = queryset.filter(usuario=user)
            elif model is TurnoCaja:
                queryset = queryset.filter(usuario=user)
        return queryset

    def _sync_items(self, serializer_class, items, drop_stock_on_update=False):
        results = []
        model = serializer_class.Meta.model
        for item in items:
            item_data = dict(item)
            instance = None
            item_id = item_data.get("id")
            if item_id:
                instance = model.objects.filter(pk=item_id).first()

            if drop_stock_on_update and instance is not None:
                item_data.pop("stock_actual", None)

            serializer = serializer_class(instance=instance, data=item_data, partial=bool(instance), context={"request": self.request})
            serializer.is_valid(raise_exception=True)
            saved = serializer.save()
            if hasattr(saved, "estado_sync"):
                saved.estado_sync = EstadoSync.SINCRONIZADO
                saved.save(update_fields=["estado_sync", "updated_at"])
            results.append(str(saved.id))
        return results

    def _sync_turnos(self, items):
        results = []
        for item in items:
            item_data = dict(item)
            instance = TurnoCaja.objects.filter(pk=item_data.get("id")).first() if item_data.get("id") else None
            serializer = TurnoCajaSerializer(instance=instance, data=item_data, partial=bool(instance), context={"request": self.request})
            serializer.is_valid(raise_exception=True)
            saved = serializer.save(usuario=item_data.get("usuario") or self.request.user)
            saved.estado_sync = EstadoSync.SINCRONIZADO
            saved.save(update_fields=["estado_sync", "updated_at"])
            results.append(str(saved.id))
        return results

    def _sync_ventas(self, items):
        results = []
        for item in items:
            item_data = dict(item)
            instance = Venta.objects.filter(pk=item_data.get("id")).first() if item_data.get("id") else None
            serializer = VentaSerializer(instance=instance, data=item_data, partial=bool(instance), context={"request": self.request})
            serializer.is_valid(raise_exception=True)
            saved = serializer.save()
            saved.estado_sync = EstadoSync.SINCRONIZADO
            saved.sincronizada_en = timezone.now()
            saved.save(update_fields=["estado_sync", "sincronizada_en", "updated_at"])
            saved.detalles.update(estado_sync=EstadoSync.SINCRONIZADO)
            results.append(str(saved.id))
        return results

    def _sync_compras(self, items):
        results = []
        for item in items:
            item_data = dict(item)
            instance = Compra.objects.filter(pk=item_data.get("id")).first() if item_data.get("id") else None
            serializer = CompraSerializer(instance=instance, data=item_data, partial=bool(instance), context={"request": self.request})
            serializer.is_valid(raise_exception=True)
            saved = serializer.save(usuario=item_data.get("usuario") or self.request.user)
            saved.estado_sync = EstadoSync.SINCRONIZADO
            saved.save(update_fields=["estado_sync", "updated_at"])
            results.append(str(saved.id))
        return results


class ImportarProductosView(APIView):
    permission_classes = [IsAdministrador]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        archivo = request.FILES.get("archivo")
        modo = request.data.get("modo", "importar")  # "preview" o "importar"

        if not archivo:
            return Response({"error": "No se proporcionó archivo"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if archivo.name.endswith(".csv"):
                df = pd.read_csv(io.BytesIO(archivo.read()), encoding="utf-8")
            else:
                df = pd.read_excel(io.BytesIO(archivo.read()))
        except Exception as e:
            return Response({"error": f"Error al leer archivo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

        columnas_requeridas = ["codigo", "nombre", "precio_venta"]
        columnas_faltantes = [col for col in columnas_requeridas if col not in df.columns]
        if columnas_faltantes:
            return Response({"error": f"Columnas faltantes: {columnas_faltantes}"}, status=status.HTTP_400_BAD_REQUEST)

        resultados = []
        errores = []

        for idx, row in df.iterrows():
            try:
                codigo = str(row.get("codigo", "")).strip()
                nombre = str(row.get("nombre", "")).strip()
                if not codigo or not nombre:
                    errores.append({"fila": idx + 2, "error": "Código o nombre vacío"})
                    continue

                precio_venta = self._parse_decimal(row.get("precio_venta", 0))
                costo = self._parse_decimal(row.get("costo", 0))
                stock_actual = int(row.get("stock_actual", 0)) if pd.notna(row.get("stock_actual")) else 0
                stock_minimo = int(row.get("stock_minimo", 0)) if pd.notna(row.get("stock_minimo")) else 0
                descripcion = str(row.get("descripcion", "")) if pd.notna(row.get("descripcion")) else ""
                codigo_barras = str(row.get("codigo_barras", "")) if pd.notna(row.get("codigo_barras")) else ""

                resultado = {
                    "fila": idx + 2,
                    "codigo": codigo,
                    "nombre": nombre,
                    "precio_venta": float(precio_venta),
                    "costo": float(costo),
                    "stock_actual": stock_actual,
                    "stock_minimo": stock_minimo,
                    "descripcion": descripcion,
                    "codigo_barras": codigo_barras,
                }

                if modo == "preview":
                    producto_existente = Producto.objects.filter(codigo=codigo).first()
                    resultado["accion"] = "crear" if not producto_existente else "actualizar"
                    resultado["existe"] = producto_existente is not None
                    resultados.append(resultado)
                else:
                    producto, created = Producto.objects.update_or_create(
                        codigo=codigo,
                        defaults={
                            "nombre": nombre,
                            "precio_venta": precio_venta,
                            "costo": costo,
                            "stock_actual": stock_actual,
                            "stock_minimo": stock_minimo,
                            "descripcion": descripcion,
                            "codigo_barras": codigo_barras,
                            "estado_sync": EstadoSync.PENDIENTE
                        }
                    )
                    resultados.append({
                        "fila": idx + 2,
                        "codigo": codigo,
                        "nombre": nombre,
                        "accion": "creado" if created else "actualizado",
                        "id": str(producto.id)
                    })

            except Exception as e:
                errores.append({"fila": idx + 2, "error": str(e)})

        return Response({
            "total_filas": len(df),
            "procesados": len(resultados),
            "errores": errores,
            "resultados": resultados[:50] if modo == "preview" else resultados
        })

    def _parse_decimal(self, value):
        if pd.isna(value):
            return Decimal("0.00")
        try:
            return Decimal(str(value).replace(",", "."))
        except:
            return Decimal("0.00")