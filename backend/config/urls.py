from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, HttpResponseNotFound
from pathlib import Path
import mimetypes

FRONTEND_DIR = Path(__file__).resolve().parent.parent.parent / "frontend"

def index(request):
    index_path = FRONTEND_DIR / "index.html"
    return HttpResponse(index_path.read_text(encoding="utf-8"), content_type="text/html")

def serve_frontend_asset(request, path):
    asset_path = FRONTEND_DIR / path
    if not asset_path.exists() or not asset_path.is_file():
        return HttpResponseNotFound()
    content_type, _ = mimetypes.guess_type(str(asset_path))
    return HttpResponse(asset_path.read_bytes(), content_type=content_type or "application/octet-stream")

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("", index, name="home"),
    path("<path:path>", serve_frontend_asset),
]
