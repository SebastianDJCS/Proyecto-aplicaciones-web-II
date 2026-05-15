from decimal import Decimal

from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Compra, Categoria, DetalleCompra, DetalleVenta, ListaPrecio, ListaPrecioItem, Producto, Proveedor, TurnoCaja, Venta
from rest_framework import serializers
from .models import Usuario
Usuario = get_user_model()


class UsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Usuario
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'telefono', 'rol', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if not password:
            raise serializers.ValidationError({"password": "La contraseña es requerida para crear usuarios."})
        user = Usuario.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance


class ProveedorSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)

    class Meta:
        model = Proveedor
        fields = [
            "id",
            "nombre",
            "documento_fiscal",
            "contacto",
            "telefono",
            "correo",
            "direccion",
            "activo",
            "estado_sync",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class CategoriaSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)

    class Meta:
        model = Categoria
        fields = ["id", "nombre", "descripcion", "estado_sync", "created_at", "updated_at"]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class ProductoSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    proveedor_nombre = serializers.CharField(source="proveedor.nombre", read_only=True)
    categoria_nombre = serializers.CharField(source="categoria.nombre", read_only=True)

    class Meta:
        model = Producto
        fields = [
            "id",
            "codigo",
            "codigo_barras",
            "nombre",
            "descripcion",
            "stock_actual",
            "stock_minimo",
            "costo",
            "precio_venta",
            "categoria",
            "categoria_nombre",
            "proveedor",
            "proveedor_nombre",
            "activo",
            "estado_sync",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class ListaPrecioItemSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    lista_precio_nombre = serializers.CharField(source="lista_precio.nombre", read_only=True)
    producto_nombre = serializers.CharField(source="producto.nombre", read_only=True)

    class Meta:
        model = ListaPrecioItem
        fields = [
            "id",
            "lista_precio",
            "lista_precio_nombre",
            "producto",
            "producto_nombre",
            "precio",
            "activo",
            "estado_sync",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class ListaPrecioSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    items = ListaPrecioItemSerializer(many=True, read_only=True)

    class Meta:
        model = ListaPrecio
        fields = [
            "id",
            "nombre",
            "descripcion",
            "porcentaje_margen",
            "es_default",
            "vigente_desde",
            "vigente_hasta",
            "activa",
            "estado_sync",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class TurnoCajaSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), required=False)
    usuario_nombre = serializers.CharField(source="usuario.get_full_name", read_only=True)

    class Meta:
        model = TurnoCaja
        fields = [
            "id",
            "usuario",
            "usuario_nombre",
            "fecha_apertura",
            "fecha_cierre",
            "monto_apertura",
            "monto_cierre",
            "total_ventas",
            "total_efectivo",
            "estado",
            "observaciones",
            "estado_sync",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at", "fecha_cierre", "total_ventas", "total_efectivo"]


class TurnoCajaCierreSerializer(serializers.Serializer):
    monto_cierre = serializers.DecimalField(max_digits=12, decimal_places=2, required=False, allow_null=True)
    observaciones = serializers.CharField(required=False, allow_blank=True)


class DetalleVentaInputSerializer(serializers.Serializer):
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    cantidad = serializers.IntegerField(min_value=1)
    precio_unitario = serializers.DecimalField(max_digits=12, decimal_places=2, required=False)
    descuento_unitario = serializers.DecimalField(max_digits=12, decimal_places=2, required=False, default=Decimal("0.00"))


class DetalleVentaSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    producto_nombre = serializers.CharField(source="producto.nombre", read_only=True)

    class Meta:
        model = DetalleVenta
        fields = [
            "id",
            "venta",
            "producto",
            "producto_nombre",
            "cantidad",
            "precio_unitario",
            "descuento_unitario",
            "subtotal",
            "estado_sync",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class DetalleCompraSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    producto_nombre = serializers.CharField(source="producto.nombre", read_only=True)

    class Meta:
        model = DetalleCompra
        fields = [
            "id",
            "compra",
            "producto",
            "producto_nombre",
            "cantidad",
            "costo_unitario",
            "subtotal",
            "estado_sync",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["estado_sync", "created_at", "updated_at"]


class VentaSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    vendedor = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), required=False)
    detalles = DetalleVentaInputSerializer(many=True, write_only=True)
    detalles_detalle = DetalleVentaSerializer(source="detalles", many=True, read_only=True)
    vendedor_nombre = serializers.CharField(source="vendedor.get_full_name", read_only=True)
    turno_caja_detalle = TurnoCajaSerializer(source="turno_caja", read_only=True)

    class Meta:
        model = Venta
        fields = [
            "id",
            "turno_caja",
            "turno_caja_detalle",
            "vendedor",
            "vendedor_nombre",
            "cliente_nombre",
            "cliente_documento",
            "numero_factura",
            "fecha_venta",
            "subtotal",
            "descuento_total",
            "impuesto_total",
            "total",
            "monto_pagado",
            "cambio",
            "medio_pago",
            "estado",
            "observaciones",
            "sincronizada_en",
            "estado_sync",
            "detalles",
            "detalles_detalle",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "vendedor_nombre",
            "numero_factura",
            "fecha_venta",
            "subtotal",
            "descuento_total",
            "impuesto_total",
            "total",
            "cambio",
            "estado",
            "sincronizada_en",
            "estado_sync",
            "created_at",
            "updated_at",
        ]

    def create(self, validated_data):
        detalles = validated_data.pop("detalles", [])
        request = self.context["request"]
        return Venta.registrar_venta(
            turno_caja=validated_data["turno_caja"],
            vendedor=validated_data.get("vendedor") or request.user,
            cliente_nombre=validated_data.get("cliente_nombre", ""),
            cliente_documento=validated_data.get("cliente_documento", ""),
            medio_pago=validated_data.get("medio_pago", Venta.MEDIO_EFECTIVO),
            monto_pagado=validated_data.get("monto_pagado", Decimal("0.00")),
            impuesto_total=validated_data.get("impuesto_total", Decimal("0.00")),
            descuento_total=validated_data.get("descuento_total", Decimal("0.00")),
            observaciones=validated_data.get("observaciones", ""),
            detalles=detalles,
        )

    def update(self, instance, validated_data):
        detalles = validated_data.pop("detalles", None)
        for attribute, value in validated_data.items():
            setattr(instance, attribute, value)
        if detalles is not None:
            instance.estado_sync = instance.estado_sync
        instance.save()
        return instance


class CompraSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)
    usuario = serializers.PrimaryKeyRelatedField(queryset=Usuario.objects.all(), required=False)
    proveedor_nombre = serializers.CharField(source="proveedor.nombre", read_only=True)
    usuario_nombre = serializers.CharField(source="usuario.get_full_name", read_only=True)
    detalles = DetalleCompraSerializer(many=True, required=False)

    class Meta:
        model = Compra
        fields = [
            "id",
            "proveedor",
            "proveedor_nombre",
            "usuario",
            "usuario_nombre",
            "numero_documento",
            "fecha_compra",
            "subtotal",
            "impuesto_total",
            "total",
            "total_factura",
            "observaciones",
            "estado_sync",
            "detalles",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["usuario", "usuario_nombre", "estado_sync", "created_at", "updated_at"]

    total_factura = serializers.DecimalField(source="total", max_digits=12, decimal_places=2, read_only=True)

    def create(self, validated_data):
        detalles = validated_data.pop("detalles", [])
        request = self.context["request"]
        if detalles:
            return Compra.registrar_compra(
                proveedor=validated_data["proveedor"],
                usuario=validated_data.get("usuario") or request.user,
                numero_documento=validated_data["numero_documento"],
                detalles=detalles,
                impuesto_total=validated_data.get("impuesto_total", Decimal("0.00")),
                observaciones=validated_data.get("observaciones", ""),
            )
        return super().create(validated_data)


class SyncPayloadSerializer(serializers.Serializer):
    last_sync = serializers.DateTimeField(required=False, allow_null=True)
    proveedores = ProveedorSerializer(many=True, required=False)
    productos = ProductoSerializer(many=True, required=False)
    listas_precio = ListaPrecioSerializer(many=True, required=False)
    listas_precio_items = ListaPrecioItemSerializer(many=True, required=False)
    turnos_caja = TurnoCajaSerializer(many=True, required=False)
    ventas = VentaSerializer(many=True, required=False)
    compras = CompraSerializer(many=True, required=False)


class DashboardResumenSerializer(serializers.Serializer):
    productos = serializers.IntegerField()
    productos_stock_bajo = serializers.IntegerField()
    ventas_hoy = serializers.IntegerField()
    total_ventas_hoy = serializers.DecimalField(max_digits=12, decimal_places=2)
    turnos_abiertos = serializers.IntegerField()
    compras_hoy = serializers.IntegerField()
