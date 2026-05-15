from rest_framework.permissions import BasePermission, SAFE_METHODS

from .models import Usuario, ROL_ADMINISTRADOR, ROL_VENDEDOR


class IsAdministrador(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and getattr(user, "rol", None) == ROL_ADMINISTRADOR)


class IsAdministradorOVendedor(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if not user or not user.is_authenticated:
            return False
        return getattr(user, "rol", None) in {ROL_ADMINISTRADOR, ROL_VENDEDOR}


class IsAdministradorOReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        user = request.user
        return bool(user and user.is_authenticated and getattr(user, "rol", None) == ROL_ADMINISTRADOR)