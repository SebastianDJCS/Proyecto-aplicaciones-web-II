const DB_NAME = "tasks-pwa-db";
const DB_VERSION = 2;
const STORE_TASKS = "tasks";
const STORE_PENDING = "pendingOps";

function waitTransaction(tx) {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_TASKS)) {
        db.createObjectStore(STORE_TASKS, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(STORE_PENDING)) {
        db.createObjectStore(STORE_PENDING, { keyPath: "opId", autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveTasks(tasks) {
  const db = await openDB();
  const tx = db.transaction(STORE_TASKS, "readwrite");
  const store = tx.objectStore(STORE_TASKS);
  store.clear();
  tasks.forEach((task) => store.put(task));
  await waitTransaction(tx);
}

export async function getTasks() {
  const db = await openDB();
  const tx = db.transaction(STORE_TASKS, "readonly");
  const store = tx.objectStore(STORE_TASKS);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

export async function putTask(task) {
  const db = await openDB();
  const tx = db.transaction(STORE_TASKS, "readwrite");
  tx.objectStore(STORE_TASKS).put(task);
  await waitTransaction(tx);
}

export async function removeTask(taskId) {
  const db = await openDB();
  const tx = db.transaction(STORE_TASKS, "readwrite");
  tx.objectStore(STORE_TASKS).delete(taskId);
  await waitTransaction(tx);
}

export async function replaceTaskId(oldId, newTask) {
  const db = await openDB();
  const tx = db.transaction(STORE_TASKS, "readwrite");
  const store = tx.objectStore(STORE_TASKS);
  store.delete(oldId);
  store.put(newTask);
  await waitTransaction(tx);
}

export async function addPendingOperation(operation) {
  const db = await openDB();
  const tx = db.transaction(STORE_PENDING, "readwrite");
  tx.objectStore(STORE_PENDING).add(operation);
  await waitTransaction(tx);
}

export async function getPendingOperations() {
  const db = await openDB();
  const tx = db.transaction(STORE_PENDING, "readonly");
  const store = tx.objectStore(STORE_PENDING);

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve((request.result || []).sort((a, b) => a.opId - b.opId));
    request.onerror = () => reject(request.error);
  });
}

export async function clearPendingOperations() {
  const db = await openDB();
  const tx = db.transaction(STORE_PENDING, "readwrite");
  tx.objectStore(STORE_PENDING).clear();
  await waitTransaction(tx);
}
