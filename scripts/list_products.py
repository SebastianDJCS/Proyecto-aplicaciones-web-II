import os
import sys
from pathlib import Path

project_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(project_root))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()
from api.models import Producto

print('LOCAL:')
for p in Producto.objects.all():
    print(p.pk, p.codigo, p.nombre, p.stock_actual)

print('\nNEON:')
try:
    for p in Producto.objects.using('neon').all():
        print(p.pk, p.codigo, p.nombre, p.stock_actual)
except Exception as e:
    print('neon error', e)
