from django.core.exceptions import ValidationError
from django.test import TestCase

from .models import Producto, Proveedor, Usuario, ROL_ADMINISTRADOR


class ProductoModelTests(TestCase):
    def test_stock_minimo_validation(self):
        proveedor = Proveedor.objects.create(nombre="Proveedor Demo")
        producto = Producto(
            codigo="PRD-001",
            nombre="Producto Demo",
            stock_actual=10,
            stock_minimo=-1,
            costo="10.00",
            precio_venta="15.00",
            proveedor=proveedor,
        )
        with self.assertRaises(ValidationError):
            producto.full_clean()


class UsuarioModelTests(TestCase):
    def test_admin_role_sets_staff(self):
        usuario = Usuario.objects.create_user(
            username="admin",
            password="secret123",
            rol=ROL_ADMINISTRADOR,
        )
        self.assertTrue(usuario.is_staff)
