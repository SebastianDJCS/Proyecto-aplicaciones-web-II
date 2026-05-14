const API_BASE = "http://127.0.0.1:8000/api/tasks/";

export async function listTasks() {
  const response = await fetch(API_BASE);
  if (!response.ok) throw new Error("No se pudieron cargar tareas");
  return response.json();
}

export async function createTask(title) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });

  if (!response.ok) throw new Error("No se pudo crear la tarea");
  return response.json();
}

export async function updateTask(id, payload) {
  const response = await fetch(`${API_BASE}${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("No se pudo actualizar la tarea");
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_BASE}${id}/`, { method: "DELETE" });
  if (!response.ok) throw new Error("No se pudo eliminar la tarea");
}
