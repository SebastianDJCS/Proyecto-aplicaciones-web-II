import os
import sys
from pathlib import Path

project_root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(project_root))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
import django
django.setup()
from api.models import Producto

print('local', Producto.objects.count())
try:
    print('neon', Producto.objects.using('neon').count())
except Exception as e:
    print('neon error', e)
