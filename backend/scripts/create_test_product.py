import os
import sys
from pathlib import Path
project_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(project_root))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()
from api.models import Producto

p = Producto.objects.create(codigo='SYNC-TEST', nombre='Prueba Sync', stock_actual=5)
print(p.id)
