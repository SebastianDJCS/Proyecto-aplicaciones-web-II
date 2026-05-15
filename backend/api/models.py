import uuid
from decimal import Decimal

from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models, transaction
from django.db.models import Sum
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models

class EstadoSync(models.TextChoices):
    PENDIENTE = "pendiente", "Pendiente"
    SINCRONIZADO = "sincronizado", "Sincronizado"
    ERROR = "error", "Error"


class UUIDTimeStampedModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    estado_sync = models.CharField(max_length=20, choices=EstadoSync.choices, default=EstadoSync.PENDIENTE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True




# 1. Define las constantes y opciones PRIMERO
ROL_ADMINISTRADOR = 'administrador'
ROL_VENDEDOR = 'vendedor'

ROL_CHOICES = [
    (ROL_ADMINISTRADOR, 'Administrador'),
    (ROL_VENDEDOR, 'Vendedor/Cajero'),
]

# 2. Ahora define la clase Usuario
class Usuario(AbstractUser):
    # Campos que ya tenías
    telefono = models.CharField(max_length=15, blank=True, null=True)
    
    # Aquí ya no dará error porque ROL_CHOICES ya existe arriba
    rol = models.CharField(
        max_length=20, 
        choices=ROL_CHOICES, 
        default=ROL_VENDEDOR
    )

    # Recuerda mantener los related_name para evitar el error previo
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_groups_set',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_permissions_set',
        blank=True
    )

    def __str__(self):
        return f"{self.username} - {self.rol}"

    class Meta(AbstractUser.Meta):
        verbose_name = "usuario"
        verbose_name_plural = "usuarios"

    def save(self, *args, **kwargs):
        self.is_staff = self.is_superuser or self.rol == ROL_ADMINISTRADOR
        super().save(*args, **kwargs)

    @property
    def es_administrador(self) -> bool:
        return self.rol == ROL_ADMINISTRADOR

    @property
    def es_vendedor(self) -> bool:
        return self.rol == ROL_VENDEDOR


class Proveedor(UUIDTimeStampedModel):
    nombre = models.CharField(max_length=180)
    documento_fiscal = models.CharField(max_length=30, blank=True)
    contacto = models.CharField(max_length=120, blank=True)
    telefono = models.CharField(max_length=30, blank=True)
    correo = models.EmailField(blank=True)
    direccion = models.CharField(max_length=255, blank=True)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "proveedor"
        verbose_name_plural = "proveedores"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return self.nombre


class Categoria(UUIDTimeStampedModel):
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField(blank=True)

    class Meta:
        verbose_name = "categoria"
        verbose_name_plural = "categorias"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return self.nombre


class Producto(UUIDTimeStampedModel):
    codigo = models.CharField(max_length=60, unique=True)
    codigo_barras = models.CharField(max_length=60, blank=True)
    nombre = models.CharField(max_length=180)
    descripcion = models.TextField(blank=True)
    stock_actual = models.PositiveIntegerField(default=0)
    stock_minimo = models.PositiveIntegerField(default=0)
    costo = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    precio_venta = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    categoria = models.ForeignKey(
        Categoria,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="productos",
    )
    proveedor = models.ForeignKey(
        Proveedor,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="productos",
    )
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "producto"
        verbose_name_plural = "productos"
        ordering = ["nombre"]

    def clean(self):
        super().clean()
        if self.stock_minimo < 0:
            raise ValidationError({"stock_minimo": "El stock minimo no puede ser negativo."})
        if self.stock_actual < 0:
            raise ValidationError({"stock_actual": "El stock actual no puede ser negativo."})
        if self.precio_venta < 0:
            raise ValidationError({"precio_venta": "El precio de venta no puede ser negativo."})
        if self.costo < 0:
            raise ValidationError({"costo": "El costo no puede ser negativo."})

    def descontar_stock(self, cantidad: int) -> None:
        if cantidad <= 0:
            raise ValidationError({"cantidad": "La cantidad debe ser mayor que cero."})
        if self.stock_actual < cantidad:
            raise ValidationError({"stock_actual": f"Stock insuficiente para {self.nombre}."})
        self.stock_actual -= cantidad
        self.estado_sync = EstadoSync.PENDIENTE
        self.full_clean()
        self.save(update_fields=["stock_actual", "estado_sync", "updated_at"])

    def reponer_stock(self, cantidad: int) -> None:
        if cantidad <= 0:
            raise ValidationError({"cantidad": "La cantidad debe ser mayor que cero."})
        self.stock_actual += cantidad
        self.estado_sync = EstadoSync.PENDIENTE
        self.full_clean()
        self.save(update_fields=["stock_actual", "estado_sync", "updated_at"])

    @property
    def stock_bajo(self) -> bool:
        return self.stock_actual <= self.stock_minimo

    def __str__(self) -> str:
        return f"{self.codigo} - {self.nombre}"


class ListaPrecio(UUIDTimeStampedModel):
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField(blank=True)
    porcentaje_margen = models.DecimalField(max_digits=6, decimal_places=2, default=Decimal("0.00"))
    es_default = models.BooleanField(default=False)
    vigente_desde = models.DateField(default=timezone.localdate)
    vigente_hasta = models.DateField(null=True, blank=True)
    activa = models.BooleanField(default=True)

    class Meta:
        verbose_name = "lista de precio"
        verbose_name_plural = "listas de precios"
        ordering = ["nombre"]

    def __str__(self) -> str:
        return self.nombre


class ListaPrecioItem(UUIDTimeStampedModel):
    lista_precio = models.ForeignKey(ListaPrecio, related_name="items", on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, related_name="precios_lista", on_delete=models.CASCADE)
    precio = models.DecimalField(max_digits=12, decimal_places=2)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "item de lista de precio"
        verbose_name_plural = "items de lista de precio"
        ordering = ["lista_precio", "producto"]
        constraints = [
            models.UniqueConstraint(fields=["lista_precio", "producto"], name="uniq_lista_precio_producto")
        ]

    def clean(self):
        super().clean()
        if self.precio < 0:
            raise ValidationError({"precio": "El precio no puede ser negativo."})

    def __str__(self) -> str:
        return f"{self.lista_precio} - {self.producto}"


class PrecioProducto(ListaPrecioItem):
    class Meta:
        proxy = True
        verbose_name = "precio de producto"
        verbose_name_plural = "precios de producto"


class TurnoCaja(UUIDTimeStampedModel):
    ESTADO_ABIERTO = "abierto"
    ESTADO_CERRADO = "cerrado"

    ESTADOS = [
        (ESTADO_ABIERTO, "Abierto"),
        (ESTADO_CERRADO, "Cerrado"),
    ]

    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="turnos_caja", on_delete=models.PROTECT)
    fecha_apertura = models.DateTimeField(default=timezone.now)
    fecha_cierre = models.DateTimeField(null=True, blank=True)
    monto_apertura = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    monto_cierre = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    total_ventas = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    total_efectivo = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    estado = models.CharField(max_length=20, choices=ESTADOS, default=ESTADO_ABIERTO)
    observaciones = models.TextField(blank=True)

    class Meta:
        verbose_name = "turno de caja"
        verbose_name_plural = "turnos de caja"
        ordering = ["-fecha_apertura"]

    def cerrar(self, monto_cierre: Decimal | None = None, observaciones: str = "") -> None:
        if self.estado == self.ESTADO_CERRADO:
            raise ValidationError("El turno de caja ya esta cerrado.")

        total_ventas = (
            self.ventas.filter(estado=Venta.ESTADO_PAGADA).aggregate(total=Sum("total")).get("total")
            or Decimal("0.00")
        )
        self.total_ventas = total_ventas
        self.total_efectivo = total_ventas
        self.monto_cierre = monto_cierre if monto_cierre is not None else self.monto_apertura + total_ventas
        self.fecha_cierre = timezone.now()
        self.estado = self.ESTADO_CERRADO
        self.observaciones = observaciones or self.observaciones
        self.estado_sync = EstadoSync.PENDIENTE
        self.save(
            update_fields=[
                "total_ventas",
                "total_efectivo",
                "monto_cierre",
                "fecha_cierre",
                "estado",
                "observaciones",
                "estado_sync",
                "updated_at",
            ]
        )

    def __str__(self) -> str:
        return f"Turno {self.id} - {self.get_estado_display()}"


class Venta(UUIDTimeStampedModel):
    ESTADO_PENDIENTE = "pendiente"
    ESTADO_PAGADA = "pagada"
    ESTADO_ANULADA = "anulada"

    ESTADOS = [
        (ESTADO_PENDIENTE, "Pendiente"),
        (ESTADO_PAGADA, "Pagada"),
        (ESTADO_ANULADA, "Anulada"),
    ]

    MEDIO_EFECTIVO = "efectivo"
    MEDIO_TARJETA = "tarjeta"
    MEDIO_TRANSFERENCIA = "transferencia"
    MEDIO_CREDITO = "credito"

    MEDIOS_PAGO = [
        (MEDIO_EFECTIVO, "Efectivo"),
        (MEDIO_TARJETA, "Tarjeta"),
        (MEDIO_TRANSFERENCIA, "Transferencia"),
        (MEDIO_CREDITO, "Credito"),
    ]

    turno_caja = models.ForeignKey(TurnoCaja, related_name="ventas", on_delete=models.PROTECT)
    vendedor = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="ventas", on_delete=models.PROTECT)
    cliente_nombre = models.CharField(max_length=180, blank=True)
    cliente_documento = models.CharField(max_length=40, blank=True)
    numero_factura = models.CharField(max_length=60, unique=True, blank=True)
    fecha_venta = models.DateTimeField(default=timezone.now)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    descuento_total = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    impuesto_total = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    total = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    monto_pagado = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    cambio = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    medio_pago = models.CharField(max_length=20, choices=MEDIOS_PAGO, default=MEDIO_EFECTIVO)
    estado = models.CharField(max_length=20, choices=ESTADOS, default=ESTADO_PENDIENTE)
    observaciones = models.TextField(blank=True)
    sincronizada_en = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = "venta"
        verbose_name_plural = "ventas"
        ordering = ["-fecha_venta"]

    @staticmethod
    def generar_numero_factura(venta_id: uuid.UUID) -> str:
        return f"VPR-{timezone.now():%Y%m%d}-{str(venta_id).split('-')[0].upper()}"

    @classmethod
    def registrar_venta(
        cls,
        *,
        turno_caja: TurnoCaja,
        vendedor: Usuario,
        cliente_nombre: str = "",
        cliente_documento: str = "",
        medio_pago: str = MEDIO_EFECTIVO,
        monto_pagado: Decimal | int | str = Decimal("0.00"),
        impuesto_total: Decimal | int | str = Decimal("0.00"),
        descuento_total: Decimal | int | str = Decimal("0.00"),
        observaciones: str = "",
        detalles: list[dict],
    ) -> "Venta":
        if turno_caja.estado != TurnoCaja.ESTADO_ABIERTO:
            raise ValidationError("No se puede registrar una venta en un turno cerrado.")
        if not detalles:
            raise ValidationError("La venta debe incluir al menos un detalle.")

        impuesto_total = Decimal(str(impuesto_total))
        descuento_total = Decimal(str(descuento_total))

        with transaction.atomic():
            detalle_items = []
            subtotal = Decimal("0.00")
            descuento_aplicado = Decimal("0.00")

            for item in detalles:
                producto = Producto.objects.select_for_update().get(pk=item["producto"].pk)
                cantidad = int(item["cantidad"])
                if cantidad <= 0:
                    raise ValidationError("La cantidad debe ser mayor que cero.")
                if producto.stock_actual < cantidad:
                    raise ValidationError(f"Stock insuficiente para {producto.nombre}.")

                precio_unitario = Decimal(str(item.get("precio_unitario") or producto.precio_venta))
                descuento_unitario = Decimal(str(item.get("descuento_unitario") or Decimal("0.00")))
                producto.stock_actual -= cantidad
                producto.estado_sync = EstadoSync.PENDIENTE
                producto.save(update_fields=["stock_actual", "estado_sync", "updated_at"])

                subtotal += precio_unitario * cantidad
                descuento_aplicado += descuento_unitario
                detalle_items.append(
                    DetalleVenta(
                        producto=producto,
                        cantidad=cantidad,
                        precio_unitario=precio_unitario,
                        descuento_unitario=descuento_unitario,
                        subtotal=(precio_unitario * cantidad) - descuento_unitario,
                    )
                )

            descuento_total = descuento_total + descuento_aplicado
            total = subtotal - descuento_total + impuesto_total
            monto_pagado = Decimal(str(monto_pagado)) if monto_pagado is not None else total
            if monto_pagado < total:
                raise ValidationError("El monto pagado es insuficiente para completar la venta.")

            venta = cls.objects.create(
                turno_caja=turno_caja,
                vendedor=vendedor,
                cliente_nombre=cliente_nombre,
                cliente_documento=cliente_documento,
                subtotal=subtotal,
                descuento_total=descuento_total,
                impuesto_total=impuesto_total,
                total=total,
                monto_pagado=monto_pagado,
                cambio=monto_pagado - total,
                medio_pago=medio_pago,
                estado=cls.ESTADO_PAGADA,
                observaciones=observaciones,
                estado_sync=EstadoSync.PENDIENTE,
            )
            venta.numero_factura = cls.generar_numero_factura(venta.id)
            venta.save(update_fields=["numero_factura", "updated_at"])
            for detalle in detalle_items:
                detalle.venta = venta
            DetalleVenta.objects.bulk_create(detalle_items)
            return venta

    def anular(self, motivo: str = "") -> None:
        if self.estado == self.ESTADO_ANULADA:
            return

        with transaction.atomic():
            detalles = list(self.detalles.select_related("producto").select_for_update())
            for detalle in detalles:
                producto = Producto.objects.select_for_update().get(pk=detalle.producto_id)
                producto.stock_actual += detalle.cantidad
                producto.estado_sync = EstadoSync.PENDIENTE
                producto.save(update_fields=["stock_actual", "estado_sync", "updated_at"])

            self.estado = self.ESTADO_ANULADA
            if motivo:
                self.observaciones = f"{self.observaciones}\nANULADA: {motivo}".strip()
            self.estado_sync = EstadoSync.PENDIENTE
            self.save(update_fields=["estado", "observaciones", "estado_sync", "updated_at"])

    def __str__(self) -> str:
        return self.numero_factura or f"Venta {self.id}"


class DetalleVenta(UUIDTimeStampedModel):
    venta = models.ForeignKey(Venta, related_name="detalles", on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, related_name="detalles_venta", on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    descuento_unitario = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        verbose_name = "detalle de venta"
        verbose_name_plural = "detalles de venta"
        ordering = ["created_at"]

    def clean(self):
        super().clean()
        if self.cantidad <= 0:
            raise ValidationError({"cantidad": "La cantidad debe ser mayor que cero."})
        if self.precio_unitario < 0:
            raise ValidationError({"precio_unitario": "El precio unitario no puede ser negativo."})
        if self.descuento_unitario < 0:
            raise ValidationError({"descuento_unitario": "El descuento no puede ser negativo."})
        if self.subtotal < 0:
            raise ValidationError({"subtotal": "El subtotal no puede ser negativo."})

    def __str__(self) -> str:
        return f"{self.producto} x {self.cantidad}"


class Compra(UUIDTimeStampedModel):
    proveedor = models.ForeignKey(Proveedor, related_name="compras", on_delete=models.PROTECT)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="compras", on_delete=models.PROTECT)
    numero_documento = models.CharField(max_length=60)
    fecha_compra = models.DateTimeField(default=timezone.now)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    impuesto_total = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    total = models.DecimalField(max_digits=12, decimal_places=2, default=Decimal("0.00"))
    observaciones = models.TextField(blank=True)

    class Meta:
        verbose_name = "compra"
        verbose_name_plural = "compras"
        ordering = ["-fecha_compra"]

    def __str__(self) -> str:
        return self.numero_documento

    @property
    def total_factura(self) -> Decimal:
        return self.total

    @classmethod
    def registrar_compra(
        cls,
        *,
        proveedor: Proveedor,
        usuario: Usuario,
        numero_documento: str,
        detalles: list[dict],
        impuesto_total: Decimal | int | str = Decimal("0.00"),
        observaciones: str = "",
    ) -> "Compra":
        if not detalles:
            raise ValidationError("La compra debe incluir al menos un detalle.")

        impuesto_total = Decimal(str(impuesto_total))
        with transaction.atomic():
            subtotal = Decimal("0.00")
            detalle_items = []

            for item in detalles:
                producto = Producto.objects.select_for_update().get(pk=item["producto"].pk)
                cantidad = int(item["cantidad"])
                costo_unitario = Decimal(str(item.get("costo_unitario") or producto.costo))
                if cantidad <= 0:
                    raise ValidationError("La cantidad debe ser mayor que cero.")
                producto.stock_actual += cantidad
                producto.estado_sync = EstadoSync.PENDIENTE
                producto.save(update_fields=["stock_actual", "estado_sync", "updated_at"])
                line_subtotal = costo_unitario * cantidad
                subtotal += line_subtotal
                detalle_items.append(
                    DetalleCompra(
                        producto=producto,
                        cantidad=cantidad,
                        costo_unitario=costo_unitario,
                        subtotal=line_subtotal,
                    )
                )

            compra = cls.objects.create(
                proveedor=proveedor,
                usuario=usuario,
                numero_documento=numero_documento,
                subtotal=subtotal,
                impuesto_total=impuesto_total,
                total=subtotal + impuesto_total,
                observaciones=observaciones,
                estado_sync=EstadoSync.PENDIENTE,
            )
            for detalle in detalle_items:
                detalle.compra = compra
            DetalleCompra.objects.bulk_create(detalle_items)
            return compra


class DetalleCompra(UUIDTimeStampedModel):
    compra = models.ForeignKey(Compra, related_name="detalles", on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, related_name="detalles_compra", on_delete=models.PROTECT)
    cantidad = models.PositiveIntegerField()
    costo_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        verbose_name = "detalle de compra"
        verbose_name_plural = "detalles de compra"
        ordering = ["created_at"]

    def clean(self):
        super().clean()
        if self.cantidad <= 0:
            raise ValidationError({"cantidad": "La cantidad debe ser mayor que cero."})
        if self.costo_unitario < 0:
            raise ValidationError({"costo_unitario": "El costo unitario no puede ser negativo."})
        if self.subtotal < 0:
            raise ValidationError({"subtotal": "El subtotal no puede ser negativo."})

    def __str__(self) -> str:
        return f"{self.producto} x {self.cantidad}"
