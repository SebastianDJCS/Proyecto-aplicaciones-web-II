from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, HttpResponseNotFound
from pathlib import Path
import mimetypes

FRONTEND_DIR = Path(__file__).resolve().parent.parent.parent / "frontend"

def index(request):
    index_path = FRONTEND_DIR / "index.html"
    content = index_path.read_text(encoding="utf-8")
    response = HttpResponse(content, content_type="text/html")
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    response["X-Content-Type-Options"] = "nosniff"
    return response

def serve_frontend_asset(request, path):
    asset_path = FRONTEND_DIR / path
    if not asset_path.exists() or not asset_path.is_file():
        return HttpResponseNotFound()
    content_type, _ = mimetypes.guess_type(str(asset_path))
    response = HttpResponse(asset_path.read_bytes(), content_type=content_type or "application/octet-stream")
    response["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response["Pragma"] = "no-cache"
    response["Expires"] = "0"
    return response

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("", index, name="home"),
    path("<path:path>", serve_frontend_asset),
]
