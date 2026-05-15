from django.db import migrations


DEFAULT_CATEGORIES = [
    "Abarrotes",
    "Bebidas",
    "Lácteos",
    "Limpieza",
    "Higiene personal",
    "Botanas y dulces",
    "Carnes y embutidos",
    "Frutas y verduras",
    "Congelados",
    "Panadería",
]


def create_default_categories(apps, schema_editor):
    Categoria = apps.get_model("api", "Categoria")
    for nombre in DEFAULT_CATEGORIES:
        Categoria.objects.get_or_create(nombre=nombre, defaults={"descripcion": ""})


def remove_default_categories(apps, schema_editor):
    Categoria = apps.get_model("api", "Categoria")
    Categoria.objects.filter(nombre__in=DEFAULT_CATEGORIES).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_precioproducto_alter_usuario_rol_and_more"),
    ]

    operations = [
        migrations.RunPython(create_default_categories, remove_default_categories),
    ]