import {
  addPendingOperation,
  clearPendingOperations,
  getPendingOperations,
  getTasks,
  putTask,
  removeTask,
  replaceTaskId,
  saveTasks,
} from "./db.js";
import { createTask, deleteTask, listTasks, updateTask } from "./api.js";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const taskListEl = document.getElementById("task-list");
const statusEl = document.getElementById("status");

function setStatus(text) {
  statusEl.textContent = text;
}

function isTempId(id) {
  return typeof id === "string" && id.startsWith("tmp-");
}

function renderTasks(tasks) {
  taskListEl.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", async () => {
      try {
        if (!navigator.onLine) {
          const operation = { type: "update", id: task.id, payload: { completed: checkbox.checked } };
          await addPendingOperation(operation);
          await applyOfflineOperation(operation);
          renderTasks(await getTasks());
          setStatus("Cambio guardado localmente. Se sincronizara al reconectar.");
        } else {
          await updateTask(task.id, { completed: checkbox.checked });
          await refreshOnline();
        }
      } catch {
        setStatus("No se pudo actualizar en API");
      }
    });

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = task.title;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.className = "delete";
    removeBtn.addEventListener("click", async () => {
      try {
        if (!navigator.onLine) {
          const operation = { type: "delete", id: task.id };
          await addPendingOperation(operation);
          await applyOfflineOperation(operation);
          renderTasks(await getTasks());
          setStatus("Eliminacion guardada localmente. Se sincronizara al reconectar.");
        } else {
          await deleteTask(task.id);
          await refreshOnline();
        }
      } catch {
        setStatus("No se pudo eliminar en API");
      }
    });

    li.append(checkbox, title, removeBtn);
    taskListEl.appendChild(li);
  });
}

async function refreshOnline() {
  const tasks = await listTasks();
  renderTasks(tasks);
  await saveTasks(tasks);
  setStatus(navigator.onLine ? "Sincronizado con API" : "Modo offline");
}

async function applyOfflineOperation(operation) {
  if (operation.type === "create") {
    const localTask = {
      id: operation.id,
      title: operation.title,
      completed: operation.completed,
    };
    await putTask(localTask);
    return;
  }

  if (operation.type === "update") {
    const current = await getTasks();
    const task = current.find((item) => item.id === operation.id);
    if (!task) return;
    await putTask({ ...task, ...operation.payload });
    return;
  }

  if (operation.type === "delete") {
    await removeTask(operation.id);
  }
}

async function syncPendingOperations() {
  const pending = await getPendingOperations();
  if (!pending.length) return;

  const idMap = new Map();

  for (const op of pending) {
    if (op.type === "create") {
      const created = await createTask(op.title);
      idMap.set(op.id, created.id);
      await replaceTaskId(op.id, created);
      continue;
    }

    if (op.type === "update") {
      const resolvedId = idMap.get(op.id) || op.id;
      if (isTempId(resolvedId)) continue;
      const updated = await updateTask(resolvedId, op.payload);
      await putTask(updated);
      continue;
    }

    if (op.type === "delete") {
      const resolvedId = idMap.get(op.id) || op.id;
      if (isTempId(resolvedId)) continue;
      await deleteTask(resolvedId);
      await removeTask(resolvedId);
    }
  }

  await clearPendingOperations();
}

async function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  if (navigator.onLine) {
    try {
      await syncPendingOperations();
      await refreshOnline();
    } catch {
      const cachedTasks = await getTasks();
      renderTasks(cachedTasks);
      setStatus("API no disponible, mostrando datos locales");
    }
  } else {
    const cachedTasks = await getTasks();
    renderTasks(cachedTasks);
    setStatus("Sin conexion, mostrando cache local");
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  try {
    if (!navigator.onLine) {
      const tempId = `tmp-${Date.now()}`;
      const operation = { type: "create", id: tempId, title, completed: false };
      await addPendingOperation(operation);
      await applyOfflineOperation(operation);
      renderTasks(await getTasks());
      setStatus("Tarea guardada localmente. Se sincronizara al volver internet.");
    } else {
      await createTask(title);
      await refreshOnline();
    }
    titleInput.value = "";
  } catch {
    setStatus("No se pudo crear tarea (revisa backend/API)");
  }
});

window.addEventListener("online", async () => {
  try {
    await syncPendingOperations();
    await refreshOnline();
    setStatus("Conexion recuperada. Cambios locales sincronizados.");
  } catch {
    setStatus("Conexion recuperada, pero API no responde");
  }
});

window.addEventListener("offline", async () => {
  const cachedTasks = await getTasks();
  renderTasks(cachedTasks);
  setStatus("Modo offline");
});

init();
