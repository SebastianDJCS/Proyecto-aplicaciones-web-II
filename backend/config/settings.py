import os
from pathlib import Path
from datetime import timedelta
from urllib.parse import urlparse, parse_qs
from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured

# 1. RUTAS Y CARGA DE ENTORNO
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

# 2. SEGURIDAD
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    # Si no tienes el .env configurado aún, puedes poner una clave temporal:
    SECRET_KEY = 'django-insecure-tu-clave-aqui'

DEBUG = os.getenv("DEBUG", "True").lower() == "true"
ALLOWED_HOSTS = [host.strip() for host in os.getenv("ALLOWED_HOSTS", "127.0.0.1,localhost").split(",") if host.strip()]

# 3. DEFINICIÓN DE APLICACIONES
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Librerías de terceros
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    # Tu app de lógica
    "api",
]

# 4. MIDDLEWARE (Orden crítico para CORS y Auth)
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",  # Debe ir arriba de todo
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

# 5. TEMPLATES
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "frontend"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# 6. CONFIGURACIÓN DE BASE DE DATOS (NEON CLOUD)
# URL de conexión que proporcionaste
NEON_DATABASE_URL = "postgresql://neondb_owner:npg_SOZFi8mh1Tcg@ep-wandering-glitter-apj2uz7o-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require"
parsed = urlparse(NEON_DATABASE_URL)

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": parsed.path.lstrip("/"),
        "USER": parsed.username,
        "PASSWORD": parsed.password,
        "HOST": parsed.hostname,
        "PORT": parsed.port or "5432",
        "OPTIONS": {
            "sslmode": "require",  # Obligatorio para Neon
        },
    }
}

# 7. MODELO DE USUARIO PERSONALIZADO
AUTH_USER_MODEL = "api.Usuario"

# 8. VALIDACIÓN DE CONTRASEÑAS
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# 9. INTERNACIONALIZACIÓN
LANGUAGE_CODE = "es-co"
TIME_ZONE = "America/Bogota"
USE_I18N = True
USE_TZ = True

# 10. ARCHIVOS ESTÁTICOS
STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# 11. CORS CONFIGURATION
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
]

# 12. DJANGO REST FRAMEWORK (Soporte para JWT y Token)
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ]
}

# 13. CONFIGURACIÓN SIMPLE JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=8),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": False,
}