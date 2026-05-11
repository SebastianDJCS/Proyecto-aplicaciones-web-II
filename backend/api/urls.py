from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .views import (
    CompraViewSet,
    CategoriaViewSet,
    DashboardViewSet,
    DetalleCompraViewSet,
    ListaPrecioItemViewSet,
    ListaPrecioViewSet,
    ProductoViewSet,
    ProveedorViewSet,
    SyncViewSet,
    TurnoCajaViewSet,
    UsuarioViewSet,
    VentaViewSet,
)

router = DefaultRouter()
router.register("usuarios", UsuarioViewSet, basename="usuario")
router.register("proveedores", ProveedorViewSet, basename="proveedor")
router.register("categorias", CategoriaViewSet, basename="categoria")
router.register("productos", ProductoViewSet, basename="producto")
router.register("listas-precio", ListaPrecioViewSet, basename="lista-precio")
router.register("lista-precio-items", ListaPrecioItemViewSet, basename="lista-precio-item")
router.register("cajeros", TurnoCajaViewSet, basename="cajero")
router.register("ventas", VentaViewSet, basename="venta")
router.register("compras", CompraViewSet, basename="compra")
router.register("detalle-compras", DetalleCompraViewSet, basename="detalle-compra")
router.register("dashboard", DashboardViewSet, basename="dashboard")
router.register("sync", SyncViewSet, basename="sync")

urlpatterns = [
    path("", include(router.urls)),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("auth/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
]
