from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.forms.models import model_to_dict
from django.conf import settings

MODELS_TO_SYNC = [
    "Proveedor",
    "Categoria",
    "Producto",
    "ListaPrecio",
    "ListaPrecioItem",
    "TurnoCaja",
    "Venta",
    "DetalleVenta",
    "Compra",
    "DetalleCompra",
]


def _has_neon():
    return "neon" in settings.DATABASES


def _sync_instance(instance):
    if not _has_neon():
        return
    db = getattr(instance._state, "db", None) or "default"
    # Only sync when instance was saved on default DB
    if db != "default":
        return

    Model = instance.__class__
    data = model_to_dict(instance)
    pk = instance.pk
    # Remove auto fields that cannot be set via update_or_create
    data.pop("id", None)

    # For foreign keys, ensure we set the raw id
    for field in Model._meta.fields:
        if field.many_to_one and field.attname in data:
            # keep FK id value
            continue

    # Use using('neon') to update_or_create preserving pk
    neon_qs = Model.objects.using("neon")
    obj, created = neon_qs.update_or_create(pk=pk, defaults=data)
    return obj


@receiver(post_save)
def handle_post_save(sender, instance, created, **kwargs):
    if sender.__name__ not in MODELS_TO_SYNC:
        return
    try:
        _sync_instance(instance)
    except Exception:
        # Avoid breaking app on sync errors; in production log proper error
        pass


@receiver(post_delete)
def handle_post_delete(sender, instance, **kwargs):
    if sender.__name__ not in MODELS_TO_SYNC:
        return
    if not _has_neon():
        return
    try:
        sender.objects.using("neon").filter(pk=instance.pk).delete()
    except Exception:
        pass
