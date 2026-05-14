const STORAGE_KEYS = {
  session: "ventapro-session",
  settings: "ventapro-settings",
};

const demoUsers = {
  admin: { username: "admin", password: "admin", name: "Administrador", role: "admin", initials: "A" },
  cajero: { username: "cajero", password: "cajero", name: "Cajero", role: "cashier", initials: "C" },
};

const data = {
  products: [
    { id: "p1", code: "7501234567890", name: "Coca Cola 2L", category: "Bebidas", stock: 25, cost: 32, price: 45.5, minStock: 10 },
    { id: "p2", code: "7501234567891", name: "Pan Blanco", category: "Panadería", stock: 40, cost: 18, price: 28, minStock: 15 },
    { id: "p3", code: "7501234567892", name: "Leche Entera 1L", category: "Lácteos", stock: 30, cost: 22, price: 32.5, minStock: 12 },
    { id: "p4", code: "7501234567893", name: "Arroz 1kg", category: "Abarrotes", stock: 50, cost: 15, price: 22, minStock: 18 },
    { id: "p5", code: "7501234567894", name: "Aceite 1L", category: "Abarrotes", stock: 20, cost: 42, price: 58, minStock: 8 },
    { id: "p6", code: "7501234567895", name: "Galletas Saladas", category: "Snacks", stock: 3, cost: 12, price: 18.5, minStock: 15 },
    { id: "p7", code: "7501234567896", name: "Jabón Líquido", category: "Limpieza", stock: 2, cost: 28, price: 42, minStock: 8 },
    { id: "p8", code: "7501234567897", name: "Papel Higiénico 4pz", category: "Limpieza", stock: 28, cost: 24, price: 35, minStock: 10 },
  ],
  suppliers: [
    { id: "s1", name: "Distribuidora ABC", phone: "555-1234", email: "juan@abc.com", address: "Av. Principal 123", tags: ["Bebidas", "Snacks"] },
    { id: "s2", name: "Abarrotes del Norte", phone: "555-5678", email: "maria@norte.com", address: "Calle 5 #456", tags: ["Abarrotes", "Lácteos"] },
    { id: "s3", name: "Productos de Limpieza SA", phone: "555-9012", email: "carlos@limpieza.com", address: "Boulevard 789", tags: ["Limpieza"] },
  ],
  orders: [
    { id: "ORD-001", supplier: "Distribuidora ABC", date: "23/04/2026", total: 1250, status: "Pendiente" },
    { id: "ORD-002", supplier: "Abarrotes del Norte", date: "20/04/2026", total: 890, status: "Completada" },
  ],
  cashiers: [
    { id: "c1", name: "María García", user: "cajero", contact: "maria@ventapro.com\n555-1234", status: "Activo" },
    { id: "c2", name: "Juan López", user: "cajero2", contact: "juan@ventapro.com\n555-5678", status: "Activo" },
    { id: "c3", name: "Ana Martínez", user: "cajero3", contact: "ana@ventapro.com\n555-9012", status: "Inactivo" },
  ],
  weeklySales: [
    { day: "Lun", value: 4000 },
    { day: "Mar", value: 3000 },
    { day: "Mié", value: 5000 },
    { day: "Jue", value: 2800 },
    { day: "Vie", value: 6900 },
    { day: "Sáb", value: 8500 },
    { day: "Dom", value: 4500 },
  ],
  topProducts: [
    { label: "Coca Cola 2L", value: 27, color: "#3b82f6" },
    { label: "Pan Blanco", value: 23, color: "#8b5cf6" },
    { label: "Leche Entera", value: 20, color: "#ec4899" },
    { label: "Arroz 1kg", value: 17, color: "#f59e0b" },
    { label: "Aceite 1L", value: 13, color: "#10b981" },
  ],
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
  showModal: false,
  modalForm: null,
};

const root = document.getElementById("root");
const storedSession = loadSession();
if (storedSession) {
  state.authenticated = true;
  state.session = storedSession;
  state.token = storedSession.token;
  state.activeView = storedSession.role === "cashier" ? "point-of-sale" : "dashboard";
  if (storedSession.token) loadAllData();
}

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

// === API WRAPPER ===
async function apiCall(endpoint, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };
  if (state.token) headers.Authorization = `Bearer ${state.token}`;
  
  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || `Error ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    throw new Error(e.message);
  }
}

async function loginBackend(username, password) {
  try {
    const res = await apiCall("/auth/token/", "POST", { username, password });
    state.token = res.access;
    await loadAllData();
    return true;
  } catch (e) {
    toast(`Login fallido: ${e.message}`, "danger");
    return false;
  }
}

async function loadAllData() {
  try {
    data.cashiers = await apiCall("/usuarios/");
    data.products = await apiCall("/productos/");
    data.categories = await apiCall("/categorias/");
    data.suppliers = await apiCall("/proveedores/");
  } catch (e) {
    console.error("Error loading data:", e);
  }
}

async function createCashier(userData) {
  try {
    const res = await apiCall("/usuarios/", "POST", userData);
    toast(`Cajero ${userData.username} creado exitosamente.`, "success");
    data.cashiers = await apiCall("/usuarios/");
    state.activeView = "cashiers";
    return true;
  } catch (e) {
    toast(`Error creando cajero: ${e.message}`, "danger");
    return false;
  }
}

async function createProduct(productData) {
  try {
    const res = await apiCall("/productos/", "POST", productData);
    toast(`Producto ${productData.nombre} creado exitosamente.`, "success");
    data.products = await apiCall("/productos/");
    state.activeView = "inventory";
    return true;
  } catch (e) {
    toast(`Error creando producto: ${e.message}`, "danger");
    return false;
  }
}

async function createSupplier(supplierData) {
  try {
    const res = await apiCall("/proveedores/", "POST", supplierData);
    toast(`Proveedor ${supplierData.nombre} creado exitosamente.`, "success");
    data.suppliers = await apiCall("/proveedores/");
    state.activeView = "suppliers";
    return true;
  } catch (e) {
    toast(`Error creando proveedor: ${e.message}`, "danger");
    return false;
  }
}

async function createSale(saleData) {
  try {
    const res = await apiCall("/ventas/", "POST", saleData);
    data.products = await apiCall("/productos/");
    toast(`Venta registrada: ${res.numero_factura}`, "success");
    state.cart = [];
    state.cashReceived = "";
    return true;
  } catch (e) {
    toast(`Error registrando venta: ${e.message}`, "danger");
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
  const stats = [
    { label: "Ventas Hoy", value: 8390, trend: "+12.5% vs ayer", icon: iconMoney(), tone: "" },
    { label: "Productos Vendidos", value: 58, trend: "+8.2% vs ayer", icon: iconCube(), tone: "purple" },
    { label: "Ticket Promedio", value: 145, trend: "+5.1% vs ayer", icon: iconMoney(), tone: "green" },
    { label: "Alertas Stock", value: 3, trend: "Productos con stock bajo", icon: iconWarning(), tone: "red" },
  ];
  const lowStock = data.products.filter((item) => item.stock <= item.minStock);

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
                  <td>${item.name}</td>
                  <td><span class="chip ${item.stock <= 3 ? "danger" : "warning"}">${item.stock}</span></td>
                  <td>${item.minStock}</td>
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
  const active = data.cashiers.filter((c) => c.is_active).length;

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
                  <td><strong>${cashier.first_name} ${cashier.last_name}</strong></td>
                  <td><span class="chip neutral">${cashier.username}</span></td>
                  <td>${cashier.telefono || "Sin teléfono"}</td>
                  <td><span class="chip">${cashier.rol}</span></td>
                  <td><span class="chip ${cashier.is_active ? "success" : "danger"}">${cashier.is_active ? "Activo" : "Inactivo"}</span></td>
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
      rol: "cajero",
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
      const role = me?.rol === "administrador" ? "admin" : me?.rol === "cajero" ? "cashier" : "cashier";
      state.session = { username, name: me ? `${me.first_name} ${me.last_name}` : username, role, initials: username.substring(0, 1).toUpperCase() };
      state.activeView = role === "cashier" ? "point-of-sale" : "dashboard";
      saveSession({ ...state.session, token: state.token });
      toast(`Bienvenido, ${state.session.name}.`, "success");
      render();
      return;
    }
    
    // Fallback to demo users
    const account = Object.values(demoUsers).find((entry) => entry.username === username && entry.password === password);
    if (!account) {
      toast("Credenciales inválidas. Usa admin/admin o cajero/cajero (demo).", "danger");
      return;
    }
    state.authenticated = true;
    state.session = account;
    state.activeView = account.role === "cashier" ? "point-of-sale" : "dashboard";
    saveSession(account);
    toast(`Bienvenido, ${account.name} (demo).`, "success");
    render();
  });
}

function logout() {
  state.authenticated = false;
  state.session = null;
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
  if (success) render();
}

function restockProduct(productId) {
  const product = data.products.find((item) => item.id === productId);
  if (!product) return;
  product.stock += 10;
  toast(`${product.name} reabastecido.`, "success");
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
  state.showModal = true;
  state.modalForm = formHtml;
  render();
}

function closeModal() {
  state.showModal = false;
  state.modalForm = null;
  render();
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

