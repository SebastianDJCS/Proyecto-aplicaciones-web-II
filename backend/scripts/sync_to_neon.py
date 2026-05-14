import os
import sys
from pathlib import Path

project_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(project_root))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()
from api.models import Proveedor, Categoria, Producto

def ensure_neon(obj):
    model = obj.__class__
    pk = obj.pk
    try:
        exists = model.objects.using('neon').filter(pk=pk).exists()
    except Exception as e:
        print('neon error checking', model.__name__, e)
        return
    if exists:
        return
    data = {f.name: getattr(obj, f.name) for f in model._meta.fields if f.name != 'id'}
    # For FK fields, use the id value (foreign key attr is <field>_id)
    for f in model._meta.fields:
        if f.many_to_one:
            data[f.attname] = getattr(obj, f.attname)
    try:
        model.objects.using('neon').create(pk=pk, **data)
        print('created on neon', model.__name__, pk)
    except Exception as e:
        print('neon create error', model.__name__, pk, e)

def main():
    # Sync proveedores
    for prov in Proveedor.objects.all():
        ensure_neon(prov)
    # Sync categorias
    for cat in Categoria.objects.all():
        ensure_neon(cat)
    # Sync productos
    for prod in Producto.objects.all():
        ensure_neon(prod)

if __name__ == '__main__':
    main()
