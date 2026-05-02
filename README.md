# Proyecto Web: PWA + Django REST + PostgreSQL

Stack:
- Frontend: Progressive Web App (Service Worker, IndexedDB, Fetch API)
- Backend: Django + Django REST Framework
- Base de datos: PostgreSQL (en nube)

## Estructura

- `frontend/`: cliente PWA
- `backend/`: API central Django

## Requisitos

- Python 3.11+
- Credenciales de PostgreSQL en la nube

## 1) Configurar backend para PostgreSQL en nube

Configura el archivo `backend/.env` con tu host remoto de PostgreSQL.

## 2) Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
# Edita .env con tus datos reales de PostgreSQL en nube
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

API base: `http://127.0.0.1:8000/api/tasks/`

## 3) Frontend

Sirve la carpeta `frontend/` con un servidor estatico (no abrir solo por doble click).

Ejemplo con Python:

```bash
cd frontend
python -m http.server 5500
```

Abrir: `http://127.0.0.1:5500`

## Comportamiento offline

- Los datos se guardan localmente en IndexedDB.
- Si no hay internet o se corta la luz, puedes seguir creando, editando y eliminando tareas localmente.
- Al recuperar conexion, la PWA sincroniza automaticamente los cambios pendientes con la API.
