const STORAGE_KEYS = {
  session: "ventapro-session",
  settings: "ventapro-settings",
  appVersion: "ventapro-app-version",
};

const APP_VERSION = "2026-05-14-3";

const demoUsers = {
  admin: { username: "admin", password: "admin", name: "Administrador", role: "admin", initials: "A" },
  cajero: { username: "cajero", password: "cajero", name: "Cajero", role: "cashier", initials: "C" },
};

const data = {
  products: [],
  suppliers: [],
  categories: [],
  cashiers: [],
  orders: [],
  weeklySales: [],
  topProducts: [],
  dashboard: null,
};

const defaultSettings = {
  darkMode: false,
  compactSidebar: false,
  reduceMotion: false,
  accent: "#1d4ed8",
};

// Icon helpers returning compact SVGs for a cleaner, less "cartoon" look
function iconSvg(pathD, attrs = {}) {
  const props = Object.entries(attrs).map(([k,v]) => `${k}="${v}"`).join(' ');
  return `<svg class="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ${props}><path d="${pathD}" fill="currentColor"/></svg>`;
}

function iconHome(){ return iconSvg('M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'); }
function iconCart(){ return iconSvg('M7 4h-2l-1 2h2l3.6 7.59-1.35 2.45C8.52 16.37 9 17.5 10 17.5h7v-2h-6.42c-.14 0-.25-.11-.25-.25l.03-.12L17 6H7z'); }
function iconBox(){ return iconSvg('M21 16V8a1 1 0 0 0-.55-.9l-8-4a1 1 0 0 0-.9 0l-8 4A1 1 0 0 0 3 8v8a1 1 0 0 0 .55.9l8 4a1 1 0 0 0 .9 0l8-4A1 1 0 0 0 21 16z'); }
function iconUsers(){ return iconSvg('M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13z'); }
function iconStaff(){ return iconSvg('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'); }
function iconChart(){ return iconSvg('M3 13h4v7H3zm6-8h4v15h-4zm6 4h4v11h-4z'); }
function iconGear(){ return iconSvg('M19.14 12.94a7 7 0 0 0 0-1.88l2.03-1.58a.5.5 0 0 0 .12-.63l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.02 7.02 0 0 0-1.62-.94l-.36-2.54A.5.5 0 0 0 14 2h-4a.5.5 0 0 0-.49.42l-.36 2.54c-.58.22-1.12.52-1.62.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.85a.5.5 0 0 0 .12.63L4.86 11a7 7 0 0 0 0 1.88L2.83 14.46a.5.5 0 0 0-.12.63l1.92 3.32c.16.28.5.39.78.28l2.39-.96c.5.42 1.04.72 1.62.94l.36 2.54c.05.28.28.42.49.42h4c.21 0 .44-.14.49-.42l.36-2.54c.58-.22 1.12-.52 1.62-.94l2.39.96c.28.11.62 0 .78-.28l1.92-3.32a.5.5 0 0 0-.12-.63l-2.03-1.58z'); }
function iconArrow(){ return iconSvg('M12 2l-1.41 1.41L17.17 10H4v2h13.17l-6.58 6.59L12 22l10-10z'); }
function iconLock(){ return iconSvg('M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6-6h-1V9a5 5 0 0 0-10 0v2H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1z'); }
function iconSearch(){ return iconSvg('M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20l-6-6z'); }
function iconMoney(){ return iconSvg('M12 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm8 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z'); }
function iconCube(){ return iconSvg('M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.18L18.6 7 12 10.82 5.4 7 12 4.18z'); }
function iconWarning(){ return iconSvg('M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'); }
function iconLogout(){ return iconSvg('M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z'); }
function iconPrinter(){ return iconSvg('M19 8h-1V3H6v5H5a2 2 0 0 0-2 2v6h4v4h10v-4h4v-6a2 2 0 0 0-2-2zM8 5h8v3H8V5z'); }
function iconCard(){ return iconSvg('M20 4H4a2 2 0 0 0-2 2v3h20V6a2 2 0 0 0-2-2zM22 12H2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6z'); }

// Utility helpers
function formatCurrency(value) {
  const num = Number(value) || 0;
  return `$${num.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

function formatNumber(value) {
  const num = Number(value) || 0;
  return num.toLocaleString('es-ES');
}

function escapeHtml(str) {
  if (str == null) return "";
  return String(str).replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

const nav = {
  admin: [
    { id: "dashboard", label: "Dashboard", icon: iconHome() },
    { id: "point-of-sale", label: "Punto de Venta", icon: iconCart() },
    { id: "inventory", label: "Inventario", icon: iconBox() },
    { id: "suppliers", label: "Proveedores", icon: iconUsers() },
    { id: "cashiers", label: "Cajeros", icon: iconStaff() },
    { id: "reports", label: "Reportes", icon: iconChart() },
    { id: "settings", label: "Configuración", icon: iconGear() },
  ],
  cashier: [
    { id: "point-of-sale", label: "Punto de Venta", icon: iconCart() },
    { id: "settings", label: "Configuración", icon: iconGear() },
  ],
};

const API_BASE = "http://127.0.0.1:8000/api";

const state = {
  authenticated: false,
  session: null,
  activeView: "dashboard",
  settings: loadSettings(),
  search: { pos: "", inventory: "", supplier: "", cashier: "", category: "all" },
  cart: [],
  paymentMethod: "efectivo",
  cashReceived: "",
  token: null,
  refresh: null,
  showModal: false,
  modalForm: null,
};

let liveSyncTimer = null;
let loadAllDataInProgress = false;

const root = document.getElementById("root");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

root.addEventListener("click", handleClick);
root.addEventListener("submit", handleSubmit);
root.addEventListener("input", handleInput);
root.addEventListener("change", handleChange);
window.addEventListener("online", updateSyncBadge);
window.addEventListener("offline", updateSyncBadge);

render();
setInterval(updateSyncBadge, 1000);
ensureFreshApp().then(() => bootstrapStoredSession());

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || "null");
  } catch {
    return null;
  }
}

function saveSession(nextSession) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(nextSession));
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.session);
}

async function ensureFreshApp() {
  const previousVersion = localStorage.getItem(STORAGE_KEYS.appVersion);
  if (previousVersion === APP_VERSION) return;

  localStorage.setItem(STORAGE_KEYS.appVersion, APP_VERSION);
  try {
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));
    }
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
    }
  } catch (error) {
    console.warn("No se pudo limpiar el estado antiguo del navegador:", error);
  }
}

async function bootstrapStoredSession() {
  const storedSession = loadSession();
  if (!storedSession || !storedSession.token) return;

  state.authenticated = true;
  state.session = storedSession;
  state.token = storedSession.token;
  state.refresh = storedSession.refresh || null;
  state.activeView = storedSession.role === "cashier" ? "point-of-sale" : "dashboard";

  try {
    await loadAllData();
    render();
    startLiveSync();
  } catch (error) {
    console.warn("Stored session rejected, clearing it:", error);
    logout();
  }
}

function startLiveSync() {
  stopLiveSync();
  liveSyncTimer = window.setInterval(async () => {
    if (!state.authenticated || !state.token) return;
    try {
      await loadAllData();
      render();
    } catch (error) {
      console.error("Live sync failed:", error);
    }
  }, 30000);
}

function stopLiveSync() {
  if (liveSyncTimer) {
    window.clearInterval(liveSyncTimer);
    liveSyncTimer = null;
  }
}

// === API WRAPPER ===
async function apiCall(endpoint, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    
    // CORRECCIÓN: Manejo detallado de errores
    if (!response.ok) {
      // Intentamos leer la respuesta de Django
      const err = await response.json().catch(() => ({ detail: `Error ${response.status}` }));
      console.error(`🚨 Error del servidor en ${endpoint}:`, err);

      // Si es 401 por token inválido, intentamos refrescar y reintentar una vez
      if (response.status === 401 && err && err.code === 'token_not_valid') {
        const refreshed = await refreshToken();
        if (refreshed) {
          // reintentar la llamada con nuevo token
          if (state.token) options.headers.Authorization = `Bearer ${state.token}`;
          const retryResp = await fetch(`${API_BASE}${endpoint}`, options);
          if (retryResp.ok) return retryResp.status === 204 ? null : await retryResp.json();
          const retryErr = await retryResp.json().catch(() => ({ detail: `Error ${retryResp.status}` }));
          throw new Error(retryErr.detail || JSON.stringify(retryErr));
        } else {
          // Si no pudimos refrescar, forzamos logout
          logout();
          throw new Error('Sesión expirada. Vuelve a iniciar sesión.');
        }
      }

      const errorMsg = err.detail || JSON.stringify(err);
      throw new Error(errorMsg);
    }
    
    // Si la respuesta es 204 (No Content), no intentamos parsear JSON
    if (response.status === 204) return null;
    
    return await response.json();
  } catch (e) {
    // Relanzamos el error tal cual para que createCashier lo pueda atrapar
    throw e;
  }
}

async function loginBackend(username, password) {
  try {
    const res = await apiCall("/auth/token/", "POST", { username, password });
    if (!res || !res.access) {
      console.error("loginBackend: respuesta inválida", res);
      toast("Error al autenticar: respuesta inválida del servidor.", "danger");
      return false;
    }

    state.token = res.access;
    state.refresh = res.refresh;
    // Cargamos datos protegidos con el token recién obtenido
    await loadAllData();
    render();
    startLiveSync();
    return true;
  } catch (e) {
    console.error("Login backend falló:", e);
    toast(`Login falló: ${e.message || e}`, "danger");
    return false;
  }
}

async function refreshToken() {
  if (!state.refresh) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh: state.refresh })
    });
    if (!res.ok) return false;
    const json = await res.json();
    if (json.access) {
      state.token = json.access;
      // optionally update refresh if provided
      if (json.refresh) state.refresh = json.refresh;
      // persist new token
      saveSession({ ...state.session, token: state.token, refresh: state.refresh });
      return true;
    }
    return false;
  } catch (e) {
    console.error('refreshToken error', e);
    return false;
  }
}

async function loadAllData() {
  if (loadAllDataInProgress) {
    console.log("loadAllData ya en progreso, saltando...");
    return;
  }
  loadAllDataInProgress = true;
  console.log("Cargando datos del backend...");
  try {
    const [cashiers, products, categories, suppliers] = await Promise.allSettled([
      apiCall("/usuarios/"),
      apiCall("/productos/"),
      apiCall("/categorias/"),
      apiCall("/proveedores/")
    ]);

    if (cashiers.status === "fulfilled") data.cashiers = cashiers.value;
    if (products.status === "fulfilled") data.products = products.value;
    if (categories.status === "fulfilled") data.categories = categories.value;
    if (suppliers.status === "fulfilled") data.suppliers = suppliers.value;

    const failed = [cashiers, products, categories, suppliers].filter((item) => item.status === "rejected");
    if (failed.length) {
      console.warn("Algunos datos no se pudieron cargar:", failed.map((item) => item.reason?.message || String(item.reason)));
    }

    await loadDashboardData();

    console.log("Datos cargados:", data.cashiers.length, "cajeros,", data.products.length, "productos");
    loadAllDataInProgress = false;
  } catch (e) {
    console.error("Error loading data:", e);
    loadAllDataInProgress = false;
    throw e;
  }
}

async function loadDashboardData() {
  try {
    data.dashboard = await apiCall("/dashboard/");
  } catch (e) {
    console.error("Error loading dashboard:", e);
    data.dashboard = null;
  }
}

async function createCashier(userData) {
  // Detener liveSync temporalmente para evitar conflictos
  stopLiveSync();

  // Transformamos el objeto que recibe del formulario para que encaje 
  // exactamente con lo que el Serializer de Django exige:
  const cashierData = {
    username: userData.username,
    password: userData.password,
    first_name: userData.nombre || "",    // Toma el campo 'nombre' del form
    last_name: userData.apellido || "",   // Toma el campo 'apellido' del form
    rol: "vendedor",                      // O 'cajero', según models.py
    email: userData.email || userData.correo || "",
    telefono: userData.telefono || ""
  };

  try {
    const res = await apiCall("/usuarios/", "POST", cashierData);
    alert(`Cajero ${cashierData.username} creado exitosamente.`);
    
    // Recargamos la lista de cajeros desde el backend
    data.cashiers = await apiCall("/usuarios/");
    state.activeView = "cashiers";
    
    // Reiniciar liveSync
    startLiveSync();
    return true;
  } catch (e) {
    console.error("Error al registrar cajero:", e.message);
    alert(`Error: ${e.message}`);
    // Reiniciar liveSync anche en caso de error
    startLiveSync();
    return false;
  }
}


async function createProduct(productData) {
  stopLiveSync();
  try {
    const res = await apiCall("/productos/", "POST", productData);
    toast(`Producto ${productData.nombre} creado exitosamente.`, "success");
    data.products = await apiCall("/productos/");
    state.activeView = "inventory";
    startLiveSync();
    return true;
  } catch (e) {
    toast(`Error creando producto: ${e.message}`, "danger");
    startLiveSync();
    return false;
  }
}

async function createSupplier(supplierData) {
  stopLiveSync();
  try {
    const res = await apiCall("/proveedores/", "POST", supplierData);
    toast(`Proveedor ${supplierData.nombre} creado exitosamente.`, "success");
    data.suppliers = await apiCall("/proveedores/");
    state.activeView = "suppliers";
    startLiveSync();
    return true;
  } catch (e) {
    toast(`Error creando proveedor: ${e.message}`, "danger");
    startLiveSync();
    return false;
  }
}

async function createSale(saleData) {
  stopLiveSync();
  try {
    const res = await apiCall("/ventas/", "POST", saleData);
    await loadAllData();
    toast(`Venta registrada: ${res.numero_factura}`, "success");
    generateReceipt(res, state.cart);
    state.cart = [];
    state.cashReceived = "";
    startLiveSync();
    return true;
  } catch (e) {
    toast(`Error registrando venta: ${e.message}`, "danger");
    startLiveSync();
    return false;
  }
}

async function getOrCreateTurnoCaja() {
  try {
    const turnos = await apiCall("/cajeros/");
    const openTurno = turnos.find(t => t.estado === "abierto");
    if (openTurno) return openTurno.id;
    const newTurno = await apiCall("/cajeros/", "POST", { monto_apertura: 0 });
    return newTurno.id;
  } catch (e) {
    console.error("Error getting turno:", e);
    return null;
  }
}

function loadSettings() {
  try {
    return { ...defaultSettings, ...(JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || "null") || {}) };
  } catch {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(state.settings));
}

function applySettings() {
  document.body.dataset.theme = state.settings.darkMode ? "dark" : "light";
  document.body.classList.toggle("compact-sidebar", state.settings.compactSidebar);
  document.body.classList.toggle("reduce-motion", state.settings.reduceMotion);
  document.documentElement.style.setProperty("--accent", state.settings.accent);
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  if (themeMeta) themeMeta.setAttribute("content", state.settings.darkMode ? "#0f172a" : state.settings.accent);
}

function getCurrentDateLabel() {
  return new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function getClockLabel() {
  return new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function render() {
  applySettings();
  if (!state.authenticated) {
    root.innerHTML = loginView();
    return;
  }

  const allowedViews = getAllowedViews();
  if (!allowedViews.some((item) => item.id === state.activeView)) {
    state.activeView = allowedViews[0].id;
  }

  root.innerHTML = shellView();
  applySettings();
  updateSyncBadge();
  wireCharts();
}

function loginView() {
  return `
    <main class="login-screen">
      <section class="login-card">
        <div class="login-logo">${iconCart()}</div>
        <h1 class="login-title">VentaPro</h1>
        <p class="login-subtitle">Sistema de Ventas e Inventario</p>
        <form class="login-form" id="login-form">
          <label class="field">
            <span class="field-label">Usuario</span>
            <div class="input-wrap">
              <span class="input-icon">${iconUsers()}</span>
              <input class="input" name="username" id="login-username" type="text" placeholder="Ingresa tu usuario" autocomplete="username" />
            </div>
          </label>
          <label class="field">
            <span class="field-label">Contraseña</span>
            <div class="input-wrap">
              <span class="input-icon">${iconLock()}</span>
              <input class="input" name="password" id="login-password" type="password" placeholder="Ingresa tu contraseña" autocomplete="current-password" />
            </div>
          </label>
          <button class="button" type="submit">${iconArrow()} Iniciar Sesión</button>
        </form>
        <p class="login-demo-title">Usuarios de demostración:</p>
        <div class="demo-list">
          <div class="demo-card">
            <div><strong>Administrador</strong><span>Usuario: admin</span></div>
            <button class="button ghost" type="button" data-demo="admin">Admin</button>
          </div>
          <div class="demo-card">
            <div><strong>Cajero</strong><span>Usuario: cajero</span></div>
            <button class="button ghost" type="button" data-demo="cajero">Cajero</button>
          </div>
        </div>
      </section>
    </main>
  `;
}

function shellView() {
  const user = state.session;
  const items = getAllowedViews();
  const meta = getViewMeta(state.activeView);
  return `
    <div class="screen">
      <aside class="sidebar">
        <div class="brand">
          <h1 class="brand-name">VentaPro</h1>
          <p class="brand-subtitle">Sistema de Ventas</p>
        </div>
        <nav class="nav">
          ${items.map((item) => `
            <button class="nav-item ${item.id === state.activeView ? "active" : ""}" type="button" data-view="${item.id}">
              ${item.icon}<span>${item.label}</span>
            </button>
          `).join("")}
        </nav>
        <div class="sidebar-footer">
          <div class="user-chip">
            <div class="avatar">${user.initials}</div>
            <div><strong>${user.name}</strong><span>Sesión activa</span></div>
          </div>
        </div>
      </aside>
      <section class="content-shell">
        <header class="topbar">
          <div>
            <h1>${meta.title}</h1>
            <div class="topbar-date">${getCurrentDateLabel()}</div>
          </div>
          <div id="sync-badge" class="sync-badge"></div>
          <button class="topbar-link" type="button" data-action="logout">${iconLogout()} Cerrar Sesión</button>
        </header>
        <main class="main"><div class="view">${renderView(state.activeView)}</div></main>
      </section>
      <button class="floating-help" type="button" data-action="help">?</button>
      <div class="toast-host" id="toast-host"></div>
      <div id="modal-container" class="modal-container ${state.showModal ? "show" : ""}">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          ${state.modalForm || ""}
        </div>
      </div>
    </div>
  `;
}

function getAllowedViews() {
  return nav[state.session.role] || nav.admin;
}

function getViewMeta(viewId) {
  const meta = {
    dashboard: { title: "Panel de Control" },
    "point-of-sale": { title: "Punto de Venta" },
    inventory: { title: "Inventario" },
    suppliers: { title: "Proveedores" },
    cashiers: { title: "Cajeros" },
    reports: { title: "Reportes" },
    settings: { title: "Configuración" },
  };
  return meta[viewId] || meta.dashboard;
}

function renderView(viewId) {
  if (viewId === "dashboard") return dashboardView();
  if (viewId === "point-of-sale") return posView();
  if (viewId === "inventory") return inventoryView();
  if (viewId === "suppliers") return suppliersView();
  if (viewId === "cashiers") return cashiersView();
  if (viewId === "reports") return reportsView();
  if (viewId === "settings") return settingsView();
  return dashboardView();
}

function dashboardView() {
  const d = data.dashboard || {};
  const ventasHoy = Number(d.total_ventas_hoy) || 0;
  const numVentas = Number(d.ventas_hoy) || 0;
  const ticketPromedio = numVentas > 0 ? Math.round(ventasHoy / numVentas) : 0;

  const stats = [
    { label: "Ventas Hoy", value: ventasHoy, trend: `${numVentas} facturas`, icon: iconMoney(), tone: "" },
    { label: "Facturas", value: numVentas, trend: "Ventas realizadas", icon: iconCube(), tone: "purple" },
    { label: "Ticket Promedio", value: ticketPromedio, trend: "Por factura", icon: iconMoney(), tone: "green" },
    { label: "Alertas Stock", value: d.productos_stock_bajo || 0, trend: "Productos con stock bajo", icon: iconWarning(), tone: "red" },
  ];
  const lowStock = data.products.filter((item) => Number(item.stock_actual) <= Number(item.stock_minimo));

  return `
    <section class="view dashboard-view">
      <div class="page-head"><div><h2>Dashboard - Resumen de Ventas</h2><div class="eyebrow">Vista general del negocio</div></div></div>
      <div class="stats-grid">
        ${stats.map((stat) => `
          <article class="panel stat-card">
            <div>
              <div class="label">${stat.label}</div>
              <div class="value">${stat.value < 1000 ? formatNumber(stat.value) : formatCurrency(stat.value)}</div>
              <div class="trend">↗ ${stat.trend}</div>
            </div>
            <div class="stat-icon ${stat.tone}">${stat.icon}</div>
          </article>
        `).join("")}
      </div>
      <div class="charts-grid">
        <section class="panel chart-card">
          <h3 class="chart-title">Ventas de la Semana</h3>
          <div class="chart-stage">
            <div class="bar-chart">
              ${data.weeklySales.map((item, index) => {
                const height = Math.max(24, (item.value / 10000) * 100);
                return `
                  <div class="bar-item" data-day="${item.day}" data-value="${item.value}" data-index="${index}">
                    <button class="js-bar" type="button" style="height:${height}%"></button>
                    <span class="bar-label">${item.day}</span>
                  </div>
                `;
              }).join("")}
            </div>
            <div class="chart-tooltip" id="bar-tooltip"></div>
          </div>
        </section>
        <section class="panel pie-card">
          <h3 class="chart-title">Productos Más Vendidos</h3>
          <div class="pie-stage">
            <div class="pie-wrap">
              <svg class="pie-svg" viewBox="0 0 100 100">${renderPieSlices(data.topProducts)}</svg>
              <div class="chart-tooltip" id="pie-tooltip"></div>
            </div>
            <div class="pie-legend">
              ${data.topProducts.map((item) => `
                <div class="pie-legend-item"><span class="dot" style="background:${item.color}"></span><span>${item.label}</span><span style="color:${item.color}">${item.value}%</span></div>
              `).join("")}
            </div>
          </div>
        </section>
      </div>
      <section class="panel table-card">
        <h3>Productos con Stock Bajo</h3>
        <div class="table-responsive">
          <table>
            <thead><tr><th>Producto</th><th>Stock Actual</th><th>Stock Mínimo</th><th>Acción</th></tr></thead>
            <tbody>
              ${lowStock.map((item) => `
                <tr>
                  <td>${item.nombre}</td>
                  <td><span class="chip ${Number(item.stock_actual) <= Number(item.stock_minimo) ? "danger" : "warning"}">${item.stock_actual}</span></td>
                  <td>${item.stock_minimo}</td>
                  <td><button class="button secondary" type="button" data-action="restock" data-id="${item.id}">Reabastecer</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function posView() {
  const query = state.search.pos.trim().toLowerCase();
  const products = data.products.filter((product) => !query || [product.nombre, product.codigo, product.categoria?.nombre].some((value) => value && value.toLowerCase().includes(query)));
  const totals = cartTotals();
  const cartItems = state.cart.map((item) => ({ ...item, product: data.products.find((p) => p.id === item.id) }));

  return `
    <section class="view pos-view">
      <div class="page-head"><div><h2>Punto de Venta</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div></div>
      <div class="pos-grid">
        <div class="inventory-grid">
          <section class="panel pos-card">
            <div class="toolbar"><div class="search-wrap"><span class="search-icon">${iconSearch()}</span><input class="search-input" data-search="pos" type="text" placeholder="Buscar producto o escanear código..." value="${escapeAttr(state.search.pos)}" /></div></div>
          </section>
          <section class="panel pos-card">
            <h3>Productos Disponibles</h3>
            <div class="pos-product-grid">
              ${products.map((product) => `
                <button type="button" class="product-card compact" data-action="add-to-cart" data-id="${product.id}">
                  <div class="product-title">${product.nombre}</div>
                  <div class="product-price">${formatCurrency(product.precio_venta)}</div>
                  <div class="product-stock">Stock: ${product.stock_actual}</div>
                </button>
              `).join("")}
            </div>
          </section>
        </div>
        <aside class="panel cart-card">
          <h3>Carrito de Venta</h3>
          <div class="sale-summary">
            <div class="cart-list">
              ${cartItems.length ? cartItems.map((item) => `
                <div class="cart-item">
                  <div><strong>${item.product?.nombre || item.name}</strong><div class="subtle-text">${formatCurrency(item.price)} c/u</div></div>
                  <div style="text-align:right;">
                    <div class="qty-controls"><button type="button" data-action="decrement-cart" data-id="${item.id}">−</button><strong>${item.qty}</strong><button type="button" data-action="increment-cart" data-id="${item.id}">+</button></div>
                    <div style="margin-top:8px;">${formatCurrency(item.qty * item.price)}</div>
                    <button class="button danger" style="min-height:32px;margin-top:8px;padding:0 10px;" type="button" data-action="remove-cart" data-id="${item.id}">Quitar</button>
                  </div>
                </div>
              `).join("") : `<div class="subtle-text" style="padding:10px 0 18px;">Carrito vacío</div>`}
            </div>
            <div class="cart-footer">
              <div class="cart-total-line"><span>Subtotal:</span><strong>${formatCurrency(totals.subtotal)}</strong></div>
              <div class="cart-total-line"><span>TOTAL:</span><strong style="font-size:1.4rem;color:var(--accent)">${formatCurrency(totals.total)}</strong></div>
            </div>
          </div>
        </aside>
      </div>
      <div class="pos-grid" style="margin-top:0;">
        <div></div>
        <aside class="panel cart-card">
          <h3>Método de Pago</h3>
          <div class="payment-grid">
            <button type="button" class="payment-option ${state.paymentMethod === "efectivo" ? "active" : ""}" data-action="payment-method" data-method="efectivo">${iconMoney()} <span>Efectivo</span></button>
            <button type="button" class="payment-option ${state.paymentMethod === "tarjeta" ? "active" : ""}" data-action="payment-method" data-method="tarjeta">${iconCard()} <span>Tarjeta</span></button>
          </div>
          <div class="payment-field" style="margin-top:14px;${state.paymentMethod === "efectivo" ? "" : "display:none;"}">
            <label for="cash-input"><strong>Efectivo Recibido</strong></label>
            <input class="input" id="cash-input" data-payment-field="cash" type="number" min="0" step="0.01" placeholder="$0.00" value="${escapeAttr(state.cashReceived)}" />
          </div>
          <div class="cart-footer">
            <button class="button" type="button" data-action="finalize-sale" ${canFinalizeSale() ? "" : "disabled"}>${iconPrinter()} Finalizar Venta</button>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function inventoryView() {
  const query = state.search.inventory.trim().toLowerCase();
  const category = state.search.category;
  const categories = ["all", ...new Set(data.products.map((item) => item.categoria?.nombre || "Sin categoría"))];
  const rows = data.products.filter((product) => (!query || [product.nombre, product.codigo].some((value) => value && value.toLowerCase().includes(query))) && (category === "all" || product.categoria?.nombre === category));

  return `
    <section class="view inventory-view">
      <div class="page-head">
        <div><h2>Inventario</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div>
        <div class="section-actions"><button class="button ghost" type="button" data-action="bulk-upload">Carga Masiva</button><button class="button" type="button" data-action="new-product">Nuevo Producto</button></div>
      </div>
      <section class="panel pad inventory-list">
        <div class="toolbar">
          <div class="search-wrap"><span class="search-icon">${iconSearch()}</span><input class="search-input" data-search="inventory" type="text" placeholder="Buscar por nombre o código..." value="${escapeAttr(state.search.inventory)}" /></div>
          <select class="select" data-search-category="inventory">${categories.map((item) => `<option value="${item}" ${item === category ? "selected" : ""}>${item === "all" ? "Todas las categorías" : item}</option>`).join("")}</select>
        </div>
        <div class="table-responsive" style="margin-top:14px;">
          <table>
            <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th><th>Costo</th><th>Precio</th><th>Margen</th><th>Acciones</th></tr></thead>
            <tbody>
              ${rows.map((product) => {
                const margen = product.costo > 0 ? ((product.precio_venta - product.costo) / product.costo * 100).toFixed(1) : 0;
                return `
                <tr>
                  <td><strong>${product.nombre}</strong><br><span class="subtle-text">${product.codigo}</span></td>
                  <td><span class="chip neutral">${product.categoria?.nombre || "Sin categoría"}</span></td>
                  <td><span class="chip ${product.stock_actual <= product.stock_minimo ? "danger" : "success"}">${product.stock_actual}</span></td>
                  <td>${formatCurrency(product.costo)}</td>
                  <td>${formatCurrency(product.precio_venta)}</td>
                  <td><span class="chip success">+${margen}%</span></td>
                  <td><div class="action-icons"><button class="icon-btn" type="button" data-action="edit-product" data-id="${product.id}">✎</button><button class="icon-btn danger" type="button" data-action="delete-product" data-id="${product.id}">🗑</button></div></td>
                </tr>
              `}).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function suppliersView() {
  const query = state.search.supplier.trim().toLowerCase();
  const suppliers = data.suppliers.filter((supplier) => !query || [supplier.nombre, supplier.telefono, supplier.correo, supplier.direccion, supplier.contacto].some((value) => value && value.toLowerCase().includes(query)));

  return `
    <section class="view suppliers-view">
      <div class="page-head">
        <div><h2>Proveedores</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div>
        <div class="section-actions"><button class="button" type="button" data-action="new-supplier">Nuevo Proveedor</button></div>
      </div>
      <section class="panel pad">
        <div class="toolbar"><div class="search-wrap"><span class="search-icon">${iconSearch()}</span><input class="search-input" data-search="supplier" type="text" placeholder="Buscar proveedores..." value="${escapeAttr(state.search.supplier)}" /></div></div>
        <div class="supplier-cards" style="margin-top:16px;">
          ${suppliers.map((supplier) => `
            <article class="panel supplier-card">
              <div class="supplier-card-head"><div><h3>${supplier.nombre}</h3></div><div class="action-icons"><button class="icon-btn" type="button" data-action="edit-supplier" data-id="${supplier.id}">✎</button><button class="icon-btn danger" type="button" data-action="delete-supplier" data-id="${supplier.id}">🗑</button></div></div>
              <div class="supplier-meta">
                <div>☎ ${supplier.telefono || "Sin teléfono"}</div>
                <div>✉ ${supplier.correo || "Sin correo"}</div>
                <div>⌂ ${supplier.direccion || "Sin dirección"}</div>
              </div>
              ${supplier.contacto ? `<div><div class="subtle-text" style="margin-bottom:8px;">Contacto:</div><div>${supplier.contacto}</div></div>` : ""}
              <button class="button ghost" type="button" data-action="new-order" data-id="${supplier.id}">Nueva Orden de Compra</button>
            </article>
          `).join("")}
        </div>
      </section>
    </section>
  `;
}

function cashiersView() {
  const query = state.search.cashier.trim().toLowerCase();
  const cashiers = data.cashiers.filter((c) => !query || [c.first_name, c.last_name, c.username, c.telefono].some((v) => v && v.toLowerCase().includes(query)));
  const total = data.cashiers.length;
  const active = data.cashiers.filter((c) => c.is_active !== false).length;

  return `
    <section class="view cashiers-view">
      <div class="page-head">
        <div><h2>Cajeros</h2><div class="eyebrow">Total: ${total} | Activos: ${active}</div></div>
        <div class="section-actions"><button class="button" type="button" data-action="new-cashier">Nuevo Cajero</button></div>
      </div>
      <section class="panel cashiers-table">
        <div class="toolbar" style="margin-bottom:14px;"><div class="search-wrap"><span class="search-icon">${iconSearch()}</span><input class="search-input" data-search="cashier" type="text" placeholder="Buscar cajeros..." value="${escapeAttr(state.search.cashier)}" /></div></div>
        <div class="table-responsive">
          <table>
            <thead><tr><th>Cajero</th><th>Usuario</th><th>Contacto</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              ${cashiers.map((cashier) => `
                <tr>
                  <td><strong>${cashier.first_name || cashier.username} ${cashier.last_name || ""}</strong></td>
                  <td><span class="chip neutral">${cashier.username}</span></td>
                  <td>${cashier.telefono || "Sin teléfono"}</td>
                  <td><span class="chip">${cashier.rol}</span></td>
                  <td><span class="chip ${(cashier.is_active !== false) ? "success" : "danger"}">${(cashier.is_active !== false) ? "Activo" : "Inactivo"}</span></td>
                  <td><div class="action-icons"><button class="icon-btn" type="button" data-action="edit-cashier" data-id="${cashier.id}">✎</button><button class="icon-btn danger" type="button" data-action="delete-cashier" data-id="${cashier.id}">🗑</button></div></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  `;
}

function reportsView() {
  return `
    <section class="view reports-view">
      <div class="page-head"><div><h2>Reportes</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div></div>
      <section class="panel placeholder-panel"><h3>Reportes y Análisis</h3><p class="subtle-text">Sección de reportes en desarrollo...</p></section>
    </section>
  `;
}

function settingsView() {
  const accents = ["#1d4ed8", "#7c3aed", "#10b981", "#f59e0b", "#ef4444"];
  return `
    <section class="view settings-view">
      <div class="page-head"><div><h2>Configuración</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div></div>
      <div class="settings-layout">
        <section class="settings-grid">
          <div class="panel settings-card"><h3>Configuración del Sistema</h3><p class="subtle-text">Sección de configuración visual para adaptar la experiencia del panel.</p></div>
          ${[
            { label: "Modo oscuro", key: "darkMode", description: "Cambia entre una interfaz clara y una oscura." },
            { label: "Sidebar compacta", key: "compactSidebar", description: "Reduce el ancho de la barra lateral." },
            { label: "Reducir animaciones", key: "reduceMotion", description: "Minimiza transiciones y animaciones de la UI." },
          ].map((option) => `
            <article class="setting-item">
              <div><h4>${option.label}</h4><p>${option.description}</p></div>
              <label class="switch"><input type="checkbox" data-setting="${option.key}" ${state.settings[option.key] ? "checked" : ""}><span class="slider"></span></label>
            </article>
          `).join("")}
          <article class="panel pad"><h4 style="margin-bottom:12px;">Color principal</h4><div class="accent-picks">${accents.map((accent) => `<button class="accent-pick ${state.settings.accent === accent ? "active" : ""}" type="button" data-action="accent" data-accent="${accent}" style="background:${accent}"></button>`).join("")}</div></article>
        </section>
        <aside class="panel settings-preview">
          <h3>Vista previa</h3>
          <div class="preview-card"><strong>VentaPro</strong><p class="subtle-text" style="margin:8px 0 0;">El tema, los colores y la densidad visual se guardan en el navegador.</p></div>
          <div class="preview-card"><strong>${state.session.role === "admin" ? "Administrador" : "Cajero"}</strong><p class="subtle-text" style="margin:8px 0 0;">La vista activa y los ajustes continúan después de recargar.</p></div>
        </aside>
      </div>
    </section>
  `;
}

function renderPieSlices(items) {
  const center = 50;
  const radius = 38;
  let startAngle = -90;
  return items.map((item, index) => {
    const sweep = (item.value / 100) * 360;
    const endAngle = startAngle + sweep;
    const path = describeArc(center, center, radius, startAngle, endAngle);
    startAngle = endAngle;
    return `<path class="pie-slice js-pie-slice" data-label="${escapeHtml(item.label)}" data-value="${item.value}" d="${path}" fill="${item.color}" style="animation-delay:${index * 60}ms"></path>`;
  }).join("");
}

function wireCharts() {
  const barTooltip = document.getElementById("bar-tooltip");
  const pieTooltip = document.getElementById("pie-tooltip");
  const barChart = document.querySelector('.bar-chart');
  const containerH = barChart ? barChart.clientHeight : 240;
  document.querySelectorAll(".bar-item").forEach((item) => {
    // compute bar height in px based on container height so percentages render consistently
    const btn = item.querySelector('.js-bar');
    if (btn) {
      const val = Number(item.dataset.value) || 0;
      const px = Math.max(24, Math.round((val / 10000) * containerH));
      btn.style.height = px + 'px';
    }
    item.classList.add("ready");
    item.addEventListener("mouseenter", (event) => {
      item.classList.add("active");
      showTooltip(barTooltip, `${item.dataset.day}<br><strong>Ventas ($): ${formatNumber(Number(item.dataset.value))}</strong>`, event.currentTarget);
    });
    item.addEventListener("mousemove", (event) => moveTooltip(barTooltip, event.currentTarget, event));
    item.addEventListener("mouseleave", () => {
      item.classList.remove("active");
      hideTooltip(barTooltip);
    });
  });
  document.querySelectorAll(".js-pie-slice").forEach((slice) => {
    slice.addEventListener("mouseenter", (event) => {
      slice.classList.add("active");
      showTooltip(pieTooltip, `<strong>${slice.dataset.label}</strong><br>${slice.dataset.value} %`, event.currentTarget);
    });
    slice.addEventListener("mousemove", (event) => moveTooltip(pieTooltip, event.currentTarget, event));
    slice.addEventListener("mouseleave", () => {
      slice.classList.remove("active");
      hideTooltip(pieTooltip);
    });
  });
}

function handleClick(event) {
  const target = event.target.closest("[data-action], [data-view], [data-demo]");
  if (!target) return;

  if (target.dataset.action === "modal-close") {
    closeModal();
    return;
  }

  if (target.dataset.demo) {
    const demo = demoUsers[target.dataset.demo];
    const username = document.getElementById("login-username");
    const password = document.getElementById("login-password");
    if (username && password) {
      username.value = demo.username;
      password.value = demo.password;
    }
    login(demo.username, demo.password);
    return;
  }

  if (target.dataset.view) {
    state.activeView = target.dataset.view;
    render();
    return;
  }

  switch (target.dataset.action) {
    case "logout":
      logout();
      break;
    case "help":
      toast("La ayuda puede enlazarse aquí a una guía visual o soporte.", "warning");
      break;
    case "accent":
      state.settings.accent = target.dataset.accent;
      saveSettings();
      render();
      break;
    case "add-to-cart":
      addToCart(target.dataset.id);
      break;
    case "increment-cart":
      changeCartQty(target.dataset.id, 1);
      break;
    case "decrement-cart":
      changeCartQty(target.dataset.id, -1);
      break;
    case "remove-cart":
      state.cart = state.cart.filter((item) => item.id !== target.dataset.id);
      render();
      break;
    case "payment-method":
      state.paymentMethod = target.dataset.method;
      if (state.paymentMethod === "tarjeta") state.cashReceived = String(cartTotals().total.toFixed(2));
      render();
      break;
    case "finalize-sale":
      finalizeSale();
      break;
    case "restock":
      restockProduct(target.dataset.id);
      break;
    case "new-cashier":
      showModal(formNewCashier());
      break;
    case "new-product":
      showModal(formNewProduct());
      break;
    case "new-supplier":
      showModal(formNewSupplier());
      break;
    case "bulk-upload":
      toast("Carga masiva disponible para importación de productos.", "warning");
      break;
    case "edit-product":
      editProduct(target.dataset.id);
      break;
    case "delete-product":
      deleteProduct(target.dataset.id);
      break;
    case "edit-supplier":
      editSupplier(target.dataset.id);
      break;
    case "delete-supplier":
      deleteSupplier(target.dataset.id);
      break;
    case "edit-cashier":
      editCashier(target.dataset.id);
      break;
    case "delete-cashier":
      deleteCashier(target.dataset.id);
      break;
    default:
      if (target.dataset.action?.startsWith("edit-") || target.dataset.action?.startsWith("delete-") || target.dataset.action === "view-order") {
        toast(actionMessage(target.dataset.action), target.dataset.action.includes("delete") ? "danger" : "warning");
      }
  }
}

function handleSubmit(event) {
  if (event.target.id === "login-form") {
    event.preventDefault();
    login(event.target.username.value.trim(), event.target.password.value);
    return;
  }

  if (event.target.id === "form-new-cashier") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      username: formData.get("username"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name") || "",
      password: formData.get("password"),
      email: formData.get("email") || "",
      telefono: formData.get("telefono") || "",
      rol: "vendedor",
    };
    createCashier(userData).then(() => closeModal());
    return;
  }

  if (event.target.id === "form-new-product") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = {
      nombre: formData.get("nombre"),
      codigo: formData.get("codigo"),
      stock_actual: parseInt(formData.get("stock_actual") || 0),
      precio_venta: parseFloat(formData.get("precio_venta")),
      costo: parseFloat(formData.get("costo") || 0),
      activo: true,
    };
    createProduct(productData).then(() => closeModal());
    return;
  }

  if (event.target.id === "form-new-supplier") {
    event.preventDefault();
    const formData = new FormData(event.target);
    const supplierData = {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono") || "",
      correo: formData.get("correo") || "",
      direccion: formData.get("direccion") || "",
      activo: true,
    };
    createSupplier(supplierData).then(() => closeModal());
    return;
  }
}

function handleInput(event) {
  const { target } = event;
  if (target.matches("[data-search='pos']")) {
    state.search.pos = target.value;
    render();
  } else if (target.matches("[data-search='inventory']")) {
    state.search.inventory = target.value;
    render();
  } else if (target.matches("[data-search='supplier']")) {
    state.search.supplier = target.value;
    render();
  } else if (target.matches("[data-search='cashier']")) {
    state.search.cashier = target.value;
    render();
  } else if (target.matches("[data-payment-field='cash']")) {
    state.cashReceived = target.value;
  }
}

function handleChange(event) {
  const { target } = event;
  if (target.matches("[data-search-category='inventory']")) {
    state.search.category = target.value;
    render();
  } else if (target.matches("[data-setting='darkMode'], [data-setting='compactSidebar'], [data-setting='reduceMotion']")) {
    state.settings[target.dataset.setting] = target.checked;
    saveSettings();
    render();
  }
}

function login(username, password) {
  // First try backend API if available
  loginBackend(username, password).then(async (backendSuccess) => {
    if (backendSuccess) {
      state.authenticated = true;
      // Obtener info del usuario logueado
      const me = await apiCall("/usuarios/me/").catch(() => null);
      const role = me?.rol === "administrador"
        ? "admin"
        : me?.rol === "cajero"
          ? "cashier"
          : (username.toLowerCase().includes("admin") ? "admin" : "cashier");
      state.session = { username, name: me ? `${me.first_name} ${me.last_name}` : username, role, initials: username.substring(0, 1).toUpperCase() };
      state.activeView = role === "cashier" ? "point-of-sale" : "dashboard";
      saveSession({ ...state.session, token: state.token, refresh: state.refresh });
      toast(`Bienvenido, ${state.session.name}.`, "success");
      render();
      return;
    }
    
    // Si neither worked
    toast("Credenciales inválidas. Usa admin / admin123", "danger");
    render();
  });
}

function logout() {
  stopLiveSync();
  state.authenticated = false;
  state.session = null;
  state.token = null;
  state.refresh = null;
  state.activeView = "dashboard";
  state.cart = [];
  state.cashReceived = "";
  state.paymentMethod = "efectivo";
  clearSession();
  render();
}

function addToCart(productId) {
  const product = data.products.find((item) => item.id === productId);
  if (!product) return;
  const existing = state.cart.find((item) => item.id === productId);
  const qty = existing ? existing.qty : 0;
  if (qty >= product.stock_actual) {
    toast(`No hay más stock disponible para ${product.nombre}.`, "warning");
    return;
  }
  if (existing) existing.qty += 1; else state.cart.push({ id: product.id, name: product.nombre, price: product.precio_venta, qty: 1 });
  toast(`${product.nombre} agregado al carrito.`, "success");
  render();
}

function changeCartQty(productId, delta) {
  const item = state.cart.find((entry) => entry.id === productId);
  const product = data.products.find((entry) => entry.id === productId);
  if (!item || !product) return;
  const next = item.qty + delta;
  if (next <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  } else if (next > product.stock_actual) {
    toast(`No puedes superar el stock actual de ${product.nombre}.`, "warning");
    return;
  } else {
    item.qty = next;
  }
  render();
}

function cartTotals() {
  const subtotal = state.cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  return { subtotal, total: subtotal };
}

function canFinalizeSale() {
  if (!state.cart.length) return false;
  if (state.paymentMethod !== "efectivo") return true;
  const cash = Number(state.cashReceived);
  return Number.isFinite(cash) && cash >= cartTotals().total;
}

async function finalizeSale() {
  if (!canFinalizeSale()) {
    toast("Completa el carrito y el efectivo recibido para finalizar.", "warning");
    return;
  }
  const turnoId = await getOrCreateTurnoCaja();
  if (!turnoId) {
    toast("Error: No se pudo abrir un turno de caja.", "danger");
    return;
  }
  const saleData = {
    turno_caja: turnoId,
    medio_pago: state.paymentMethod === "efectivo" ? "efectivo" : state.paymentMethod === "tarjeta" ? "tarjeta" : "transferencia",
    monto_pagado: parseFloat(state.cashReceived) || cartTotals().total,
    detalles: state.cart.map(item => ({
      producto: item.id,
      cantidad: item.qty,
      precio_unitario: item.price
    }))
  };
  const success = await createSale(saleData);
  if (success) {
    state.activeView = "point-of-sale";
    render();
  }
}

function promptIfCancelled(label, currentValue = "") {
  const value = window.prompt(label, currentValue);
  return value === null ? null : value.trim();
}

async function editProduct(productId) {
  const product = data.products.find((item) => item.id === productId);
  if (!product) return;

  const nombre = promptIfCancelled("Nombre del producto", product.nombre);
  if (nombre === null) return;
  const codigo = promptIfCancelled("Código", product.codigo);
  if (codigo === null) return;
  const stockActual = promptIfCancelled("Stock actual", String(product.stock_actual ?? 0));
  if (stockActual === null) return;
  const stockMinimo = promptIfCancelled("Stock mínimo", String(product.stock_minimo ?? 0));
  if (stockMinimo === null) return;
  const costo = promptIfCancelled("Costo", String(product.costo ?? 0));
  if (costo === null) return;
  const precioVenta = promptIfCancelled("Precio de venta", String(product.precio_venta ?? 0));
  if (precioVenta === null) return;

  await apiCall(`/productos/${productId}/`, "PATCH", {
    nombre,
    codigo,
    stock_actual: Number(stockActual),
    stock_minimo: Number(stockMinimo),
    costo: Number(costo),
    precio_venta: Number(precioVenta),
  });
  await loadAllData();
  toast("Producto actualizado.", "success");
  render();
}

async function deleteProduct(productId) {
  const product = data.products.find((item) => item.id === productId);
  if (!product) return;
  if (!window.confirm(`¿Desactivar producto ${product.nombre}?`)) return;
  try {
    await apiCall(`/productos/${productId}/`, "PATCH", { activo: false });
    await loadAllData();
    toast("Producto desactivado.", "success");
    render();
  } catch (e) {
    toast(`Error: ${e.message}`, "danger");
  }
}

async function editSupplier(supplierId) {
  const supplier = data.suppliers.find((item) => item.id === supplierId);
  if (!supplier) return;

  const nombre = promptIfCancelled("Nombre del proveedor", supplier.nombre);
  if (nombre === null) return;
  const telefono = promptIfCancelled("Teléfono", supplier.telefono || "");
  if (telefono === null) return;
  const correo = promptIfCancelled("Correo", supplier.correo || "");
  if (correo === null) return;
  const direccion = promptIfCancelled("Dirección", supplier.direccion || "");
  if (direccion === null) return;
  const contacto = promptIfCancelled("Contacto", supplier.contacto || "");
  if (contacto === null) return;

  await apiCall(`/proveedores/${supplierId}/`, "PATCH", {
    nombre,
    telefono,
    correo,
    direccion,
    contacto,
    activo: supplier.activo !== false,
  });
  await loadAllData();
  toast("Proveedor actualizado.", "success");
  render();
}

async function deleteSupplier(supplierId) {
  const supplier = data.suppliers.find((item) => item.id === supplierId);
  if (!supplier) return;
  if (!window.confirm(`Eliminar proveedor ${supplier.nombre}?`)) return;
  await apiCall(`/proveedores/${supplierId}/`, "DELETE");
  await loadAllData();
  toast("Proveedor eliminado.", "success");
  render();
}

async function editCashier(cashierId) {
  const cashier = data.cashiers.find((item) => item.id === cashierId);
  if (!cashier) return;

  const firstName = promptIfCancelled("Nombre", cashier.first_name || "");
  if (firstName === null) return;
  const lastName = promptIfCancelled("Apellido", cashier.last_name || "");
  if (lastName === null) return;
  const username = promptIfCancelled("Usuario", cashier.username || "");
  if (username === null) return;
  const email = promptIfCancelled("Correo", cashier.email || "");
  if (email === null) return;
  const telefono = promptIfCancelled("Teléfono", cashier.telefono || "");
  if (telefono === null) return;
  const password = promptIfCancelled("Nueva contraseña (dejar vacía para no cambiar)", "");
  if (password === null) return;

  const payload = { first_name: firstName, last_name: lastName, username, email, telefono };
  if (password) payload.password = password;

  await apiCall(`/usuarios/${cashierId}/`, "PATCH", payload);
  await loadAllData();
  toast("Cajero actualizado.", "success");
  render();
}

async function deleteCashier(cashierId) {
  const cashier = data.cashiers.find((item) => item.id === cashierId);
  if (!cashier) return;
  if (!window.confirm(`Eliminar cajero ${cashier.username}?`)) return;
  await apiCall(`/usuarios/${cashierId}/`, "DELETE");
  await loadAllData();
  toast("Cajero eliminado.", "success");
  render();
}

function restockProduct(productId) {
  const product = data.products.find((item) => item.id === productId);
  if (!product) return;
  product.stock_actual = Number(product.stock_actual || 0) + 10;
  toast(`${product.nombre} reabastecido.`, "success");
  render();
}

function actionMessage(action) {
  const messages = {
    "bulk-upload": "Carga masiva disponible para importación de productos.",
    "new-product": "Formulario para crear un nuevo producto.",
    "edit-product": "Editar producto.",
    "delete-product": "Eliminar producto.",
    "new-supplier": "Crear nuevo proveedor.",
    "edit-supplier": "Editar proveedor.",
    "delete-supplier": "Eliminar proveedor.",
    "new-order": "Crear nueva orden de compra.",
    "view-order": "Ver detalles de la orden.",
    "new-cashier": "Crear nuevo cajero.",
    "edit-cashier": "Editar cajero.",
    "delete-cashier": "Eliminar cajero.",
  };
  return messages[action] || "Acción en desarrollo.";
}

// === MODAL FORMS ===
function showModal(formHtml) {
  stopLiveSync();
  state.showModal = true;
  state.modalForm = formHtml;
  render();
}

function closeModal() {
  state.showModal = false;
  state.modalForm = null;
  render();
  startLiveSync();
}

function formNewCashier() {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Nuevo Cajero</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-new-cashier" class="modal-form">
        <div class="form-group">
          <label>Nombre</label>
          <input class="input" name="first_name" type="text" required />
        </div>
        <div class="form-group">
          <label>Apellido</label>
          <input class="input" name="last_name" type="text" />
        </div>
        <div class="form-group">
          <label>Usuario</label>
          <input class="input" name="username" type="text" required />
        </div>
        <div class="form-group">
          <label>Contraseña</label>
          <input class="input" name="password" type="password" required />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input class="input" name="email" type="email" />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input class="input" name="telefono" type="tel" />
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Crear Cajero</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function formNewProduct() {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Nuevo Producto</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-new-product" class="modal-form">
        <div class="form-group">
          <label>Nombre</label>
          <input class="input" name="nombre" type="text" required />
        </div>
        <div class="form-group">
          <label>Código</label>
          <input class="input" name="codigo" type="text" required />
        </div>
        <div class="form-group">
          <label>Stock Actual</label>
          <input class="input" name="stock_actual" type="number" min="0" value="0" />
        </div>
        <div class="form-group">
          <label>Precio Venta</label>
          <input class="input" name="precio_venta" type="number" step="0.01" required />
        </div>
        <div class="form-group">
          <label>Costo</label>
          <input class="input" name="costo" type="number" step="0.01" />
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Crear Producto</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function formNewSupplier() {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Nuevo Proveedor</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-new-supplier" class="modal-form">
        <div class="form-group">
          <label>Nombre</label>
          <input class="input" name="nombre" type="text" required />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input class="input" name="telefono" type="tel" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input class="input" name="correo" type="email" />
        </div>
        <div class="form-group">
          <label>Dirección</label>
          <input class="input" name="direccion" type="text" />
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Crear Proveedor</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function toast(message, tone = "") {
  const host = document.getElementById("toast-host");
  if (!host) return;
  const node = document.createElement("div");
  node.className = `toast ${tone}`.trim();
  node.textContent = message;
  host.appendChild(node);
  window.setTimeout(() => node.remove(), 2600);
}

function generateReceipt(venta, cartItems) {
  const items = cartItems.map(item => {
    const product = data.products.find(p => p.id === item.id);
    return {
      nombre: product?.nombre || item.name,
      cantidad: item.qty,
      precio: item.price,
      subtotal: item.qty * item.price
    };
  });

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const total = subtotal;
  const cambio = Number(state.cashReceived) - total;

  const receiptHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Recibo - ${venta.numero_factura}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Courier Prime', 'Courier New', monospace; font-size: 12px; width: 80mm; margin: 0 auto; padding: 10px; }
        .header { text-align: center; margin-bottom: 15px; border-bottom: 1px dashed #000; padding-bottom: 10px; }
        .header h1 { font-size: 18px; font-weight: bold; margin-bottom: 5px; }
        .header p { font-size: 10px; margin: 2px 0; }
        .info { margin-bottom: 15px; font-size: 10px; }
        .info-row { display: flex; justify-content: space-between; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        th, td { text-align: left; padding: 4px 0; }
        th { border-bottom: 1px dashed #000; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .totals { border-top: 1px dashed #000; padding-top: 10px; }
        .totals .row { display: flex; justify-content: space-between; margin: 5px 0; }
        .totals .total { font-weight: bold; font-size: 14px; }
        .footer { text-align: center; margin-top: 20px; border-top: 1px dashed #000; padding-top: 10px; }
        .footer p { font-size: 10px; margin: 3px 0; }
        .payment-info { background: #f5f5f5; padding: 10px; margin: 10px 0; border-radius: 4px; }
        @media print {
          body { width: auto; margin: 0; }
          @page { margin: 0; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>VENTAPRO</h1>
        <p>Sistema de Ventas e Inventario</p>
        <p>Tel: 0000-0000</p>
      </div>
      <div class="info">
        <div class="info-row">
          <span>Factura:</span>
          <span>${venta.numero_factura || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span>Fecha:</span>
          <span>${new Date().toLocaleString('es-ES')}</span>
        </div>
        <div class="info-row">
          <span>Cajero:</span>
          <span>${state.session?.name || 'Vendedor'}</span>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th class="text-right">Cant</th>
            <th class="text-right">P.Unit</th>
            <th class="text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td>${item.nombre}</td>
              <td class="text-right">${item.cantidad}</td>
              <td class="text-right">${formatCurrency(item.precio)}</td>
              <td class="text-right">${formatCurrency(item.subtotal)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="totals">
        <div class="row">
          <span>Subtotal:</span>
          <span>${formatCurrency(subtotal)}</span>
        </div>
        <div class="row">
          <span>IVA (0%):</span>
          <span>$0.00</span>
        </div>
        <div class="row total">
          <span>TOTAL:</span>
          <span>${formatCurrency(total)}</span>
        </div>
      </div>
      <div class="payment-info">
        <div class="info-row">
          <span>Método de pago:</span>
          <span>${venta.medio_pago?.toUpperCase() || state.paymentMethod.toUpperCase()}</span>
        </div>
        <div class="info-row">
          <span>Monto recibido:</span>
          <span>${formatCurrency(Number(venta.monto_pagado) || state.cashReceived || total)}</span>
        </div>
        ${cambio > 0 ? `
        <div class="info-row">
          <span>Cambio:</span>
          <span>${formatCurrency(cambio)}</span>
        </div>
        ` : ''}
      </div>
      <div class="footer">
        <p>Gracias por su compra</p>
        <p>Vea nuestros productos en nuestra tienda</p>
        <p>¡Vuelva pronto!</p>
      </div>
      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function() { window.close(); };
        };
      </script>
    </body>
    </html>
  `;

  const printWindow = window.open('', '_blank', 'width=400,height=600');
  if (printWindow) {
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  }
}

function updateSyncBadge() {
  if (!state.authenticated) return;
  const badge = document.getElementById("sync-badge");
  if (!badge) return;
  badge.classList.toggle("offline", !navigator.onLine);
  badge.textContent = navigator.onLine ? `Sincronizado - ${getClockLabel()}` : "Sin conexión";
}

function showTooltip(tooltip, html, target) {
  if (!tooltip) return;
  tooltip.innerHTML = html;
  tooltip.classList.add("show");
  const rect = target.getBoundingClientRect();
  const parentRect = target.closest(".chart-stage, .pie-wrap")?.getBoundingClientRect() || rect;
  tooltip.style.left = `${Math.max(8, rect.left - parentRect.left + rect.width * 0.18)}px`;
  tooltip.style.top = `${Math.max(8, rect.top - parentRect.top - 72)}px`;
}

function moveTooltip(tooltip, target, event) {
  if (!tooltip || !tooltip.classList.contains("show")) return;
  const parentRect = target.closest(".chart-stage, .pie-wrap")?.getBoundingClientRect() || target.getBoundingClientRect();
  tooltip.style.left = `${Math.min(parentRect.width - 176, Math.max(8, event.clientX - parentRect.left + 14))}px`;
  tooltip.style.top = `${Math.max(8, event.clientY - parentRect.top - 72)}px`;
}

function hideTooltip(tooltip) {
  if (!tooltip) return;
  tooltip.classList.remove("show");
}

