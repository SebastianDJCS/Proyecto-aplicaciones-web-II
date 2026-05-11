from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Compra, Categoria, DetalleCompra, DetalleVenta, ListaPrecio, ListaPrecioItem, Producto, Proveedor, TurnoCaja, Usuario, Venta


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    model = Usuario
    list_display = ("username", "email", "rol", "is_staff", "is_active")
    list_filter = ("rol", "is_staff", "is_active")
    fieldsets = UserAdmin.fieldsets + (("VentaPro", {"fields": ("rol", "telefono")}),)
    add_fieldsets = UserAdmin.add_fieldsets + (("VentaPro", {"fields": ("rol", "telefono")}),)


@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    list_display = ("nombre", "documento_fiscal", "contacto", "telefono", "activo")
    search_fields = ("nombre", "documento_fiscal", "contacto")


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")
    search_fields = ("nombre",)


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ("codigo", "codigo_barras", "nombre", "categoria", "stock_actual", "stock_minimo", "precio_venta", "activo")
    search_fields = ("codigo", "nombre")
    list_filter = ("activo", "proveedor", "categoria")


@admin.register(ListaPrecio)
class ListaPrecioAdmin(admin.ModelAdmin):
    list_display = ("nombre", "porcentaje_margen", "es_default", "activa", "vigente_desde", "vigente_hasta")
    list_filter = ("activa",)
    search_fields = ("nombre",)


@admin.register(ListaPrecioItem)
class ListaPrecioItemAdmin(admin.ModelAdmin):
    list_display = ("lista_precio", "producto", "precio", "activo")
    list_filter = ("activo", "lista_precio")


@admin.register(TurnoCaja)
class TurnoCajaAdmin(admin.ModelAdmin):
    list_display = ("id", "usuario", "estado", "fecha_apertura", "fecha_cierre", "monto_apertura", "monto_cierre")
    list_filter = ("estado", "usuario")


class DetalleVentaInline(admin.TabularInline):
    model = DetalleVenta
    extra = 0


@admin.register(Venta)
class VentaAdmin(admin.ModelAdmin):
    list_display = ("numero_factura", "vendedor", "turno_caja", "estado", "total", "fecha_venta")
    list_filter = ("estado", "medio_pago", "vendedor")
    search_fields = ("numero_factura", "cliente_nombre", "cliente_documento")
    inlines = [DetalleVentaInline]


@admin.register(Compra)
class CompraAdmin(admin.ModelAdmin):
    list_display = ("numero_documento", "proveedor", "usuario", "total_factura", "fecha_compra")
    list_filter = ("proveedor", "usuario")
    search_fields = ("numero_documento",)


@admin.register(DetalleCompra)
class DetalleCompraAdmin(admin.ModelAdmin):
    list_display = ("compra", "producto", "cantidad", "costo_unitario", "subtotal")