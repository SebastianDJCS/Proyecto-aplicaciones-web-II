const STORAGE_KEYS = {
  session: "ventapro-session",
  settings: "ventapro-settings",
  appVersion: "ventapro-app-version",
  offlineData: "ventapro-offline-data",
};

const APP_VERSION = "2026-05-15-2";

// Demo users removed for production

const data = {
  products: [],
  suppliers: [],
  categories: [],
  cashiers: [],
  orders: [],
  weeklySales: [],
  topProducts: [],
  dashboard: null,
  reporte: null,
};

const defaultSettings = {
  darkMode: false,
  compactSidebar: false,
  reduceMotion: false,
  accent: "#dc2626",
  fontSize: 14,
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
function iconMoney(){ return iconSvg('M4 4h16v16H4V4zm2 2v12h12V6H6zm1 2h10v2H7V8zm0 4h10v2H7v-2z'); }
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

// Small helper to lighten/darken a hex color by percent (-100..100)
function shadeHexColor(hex, percent) {
  if (!hex) return hex;
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  const num = parseInt(h, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  const amt = Math.round(2.55 * percent);
  r = Math.min(255, Math.max(0, r + amt));
  g = Math.min(255, Math.max(0, g + amt));
  b = Math.min(255, Math.max(0, b + amt));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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

function getProductCategoryLabel(product) {
  if (!product) return "Sin categoría";
  if (product.categoria_nombre) return product.categoria_nombre;
  if (product.categoria?.nombre) return product.categoria.nombre;
  if (product.categoria) {
    const matchedCategory = data.categories.find((category) => String(category.id) === String(product.categoria));
    if (matchedCategory?.nombre) return matchedCategory.nombre;
  }
  return "Sin categoría";
}

const nav = {
  admin: [
    { id: "dashboard", label: "Resumen de ventas", icon: iconHome() },
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
let renderTimeout = null;
let modalResolver = null;

const root = document.getElementById("root");

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

root.addEventListener("click", handleClick);
root.addEventListener("submit", handleSubmit);
root.addEventListener("input", handleInput);
root.addEventListener("change", handleChange);
window.addEventListener("online", () => {
  updateSyncBadge();
  syncOfflineSales();
});
window.addEventListener("offline", updateSyncBadge);

render();
setInterval(updateSyncBadge, 1000);
loadOfflineData();
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
    window.location.reload();
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
async function apiCall(endpoint, method = "GET", body = null, isFormData = false) {
  const headers = {};
  if (state.token) headers.Authorization = `Bearer ${state.token}`;

  const options = { method, headers };
  if (body) {
    if (isFormData) {
      options.body = body;
    } else {
      headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }
  
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
    const me = await apiCall("/usuarios/me/").catch(() => null);
    const role = me?.rol === "administrador" ? "admin" : me?.rol === "cajero" ? "cashier" : "cashier";
    state.session = { username, name: me ? `${me.first_name} ${me.last_name}` : username, role, initials: username.substring(0, 1).toUpperCase() };
    state.activeView = role === "cashier" ? "point-of-sale" : "dashboard";
    state.authenticated = true;
    saveSession({ ...state.session, token: state.token, refresh: state.refresh });
    await apiCall("/usuarios/login_status/", "POST").catch(() => {});
    await loadAllData();
    data.cashiers = await apiCall("/usuarios/").catch(() => data.cashiers);
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
    const [cashiers, products, categories, suppliers, dashboard] = await Promise.allSettled([
      apiCall("/usuarios/"),
      apiCall("/productos/"),
      apiCall("/categorias/"),
      apiCall("/proveedores/"),
      apiCall("/dashboard/")
    ]);

    if (cashiers.status === "fulfilled") data.cashiers = cashiers.value;
    if (products.status === "fulfilled") data.products = products.value;
    if (categories.status === "fulfilled") data.categories = categories.value;
    if (suppliers.status === "fulfilled") data.suppliers = suppliers.value;
    if (dashboard.status === "fulfilled" && dashboard.value) {
      data.dashboard = dashboard.value;
      data.weeklySales = dashboard.value.weeklySales || [];
      data.topProducts = dashboard.value.topProducts || [];
    }

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
    const dashboardData = await apiCall("/dashboard/");
    console.log("Dashboard loaded:", dashboardData);
    data.dashboard = dashboardData;
    data.weeklySales = dashboardData.weeklySales || [];
    data.topProducts = dashboardData.topProducts || [];
  } catch (e) {
    console.error("Error loading dashboard:", e);
    data.dashboard = { total_ventas_hoy: 0, ventas_hoy: 0, productos_stock_bajo: 0 };
    data.weeklySales = [
      { day: "Lun", value: 0 },
      { day: "Mar", value: 0 },
      { day: "Mié", value: 0 },
      { day: "Jue", value: 0 },
      { day: "Vie", value: 0 },
      { day: "Sáb", value: 0 },
      { day: "Dom", value: 0 }
    ];
    data.topProducts = [];
  }
}

async function loadReportData(fecha = null) {
  try {
    let url = "/reportes/";
    if (fecha) {
      url += `?fecha=${fecha}`;
    }
    data.reporte = await apiCall(url);
  } catch (e) {
    console.error("Error loading report data:", e);
    data.reporte = null;
  }
}

async function createGasto(gastoData) {
  try {
    await apiCall("/gastos/", "POST", gastoData);
    toast("Gasto registrado exitosamente", "success");
    await loadReportData();
    render();
    return true;
  } catch (e) {
    toast(`Error: ${e.message}`, "danger");
    return false;
  }
}

async function viewSaleReceipt(saleId) {
  try {
    const venta = await apiCall(`/ventas/${saleId}/`);

    const cartItems = (venta.detalles_detalle || []).map(d => ({
      id: d.producto,
      name: d.producto_nombre || "Producto",
      qty: d.cantidad,
      price: parseFloat(d.precio_unitario)
    }));

    const fakeVenta = {
      numero_factura: venta.numero_factura,
      medio_pago: venta.medio_pago,
      monto_pagado: venta.monto_pagado,
      total: venta.total
    };

    generateReceipt(fakeVenta, cartItems);
  } catch (e) {
    toast(`Error al obtener factura: ${e.message}`, "danger");
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
    toast(`Cajero ${cashierData.username} creado exitosamente.`, "success");
    
    // Recargamos la lista de cajeros desde el backend
    data.cashiers = await apiCall("/usuarios/");
    state.activeView = "cashiers";
    
    // Reiniciar liveSync
    startLiveSync();
    return true;
  } catch (e) {
    console.error("Error al registrar cajero:", e.message);
    toast(`Error: ${e.message}`, "danger");
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

  if (navigator.onLine) {
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
  } else {
    // Modo offline: guardar venta localmente
    const offlineSale = {
      id: "offline-" + Date.now(),
      ...saleData,
      fecha_venta: new Date().toISOString(),
      numero_factura: "PENDIENTE-" + Date.now(),
      estado: "pendiente_sync",
      detalles: saleData.detalles
    };

    if (!data.offlineSales) data.offlineSales = [];
    data.offlineSales.push(offlineSale);
    saveToLocalStorage();

    // Generar recibo local
    generateReceipt(offlineSale, state.cart);

    toast("Venta guardada offline. Se sincronizará cuando haya conexión.", "warning");
    state.cart = [];
    state.cashReceived = "";
    startLiveSync();
    return true;
  }
}

async function getOrCreateTurnoCaja() {
  if (navigator.onLine) {
    try {
      const turnos = await apiCall("/cajeros/");
      const openTurno = turnos.find(t => t.estado === "abierto");
      if (openTurno) return openTurno.id;
      const newTurno = await apiCall("/cajeros/", "POST", { monto_apertura: 0 });
      return newTurno.id;
    } catch (e) {
      console.error("Error getting turno online:", e);
    }
  }
  // Modo offline: buscar turno abierto en datos locales
  const localTurno = data.cashiers?.find(t => t.estado === "abierto");
  if (localTurno) return localTurno.id;

  // Si no hay turno abierto offline, crear uno local temporal
  const tempTurnoId = "temp-" + Date.now();
  if (!data.localTurnos) data.localTurnos = [];
  const existingTemp = data.localTurnos.find(t => t.id === tempTurnoId && t.estado === "abierto");
  if (existingTemp) return existingTemp.id;

  data.localTurnos.push({
    id: tempTurnoId,
    estado: "abierto",
    monto_apertura: 0,
    created_at: new Date().toISOString()
  });
  saveToLocalStorage();
  return tempTurnoId;
}

function loadSettings() {
  try {
    return { ...defaultSettings, ...(JSON.parse(localStorage.getItem(STORAGE_KEYS.settings) || "null") || {}) };
  } catch {
    return { ...defaultSettings };
  }
}

function saveToLocalStorage() {
  const offlineData = {
    localTurnos: data.localTurnos || [],
    offlineSales: data.offlineSales || []
  };
  localStorage.setItem(STORAGE_KEYS.offlineData, JSON.stringify(offlineData));
}

function loadOfflineData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.offlineData) || "null");
    if (stored) {
      data.localTurnos = stored.localTurnos || [];
      data.offlineSales = stored.offlineSales || [];
    }
  } catch (e) {
    console.error("Error loading offline data:", e);
  }
}

async function syncOfflineSales() {
  if (!data.offlineSales || data.offlineSales.length === 0) return;

  toast(`Sincronizando ${data.offlineSales.length} ventas offline...`, "info");

  const syncedIds = [];

  for (const sale of data.offlineSales) {
    try {
      // Obtener un turno de caja válido
      const turnoId = await getOrCreateTurnoCaja();
      if (!turnoId) continue;

      const saleData = {
        turno_caja: turnoId,
        medio_pago: sale.medio_pago || "efectivo",
        monto_pagado: sale.monto_pagado || sale.total,
        detalles: sale.detalles
      };

      const result = await apiCall("/ventas/", "POST", saleData);
      syncedIds.push(sale.id);
      toast(`Venta ${result.numero_factura} sincronizada`, "success");
    } catch (e) {
      console.error("Error sincronizando venta:", e);
    }
  }

  // Eliminar ventas sincronizadas
  data.offlineSales = data.offlineSales.filter(s => !syncedIds.includes(s.id));
  saveToLocalStorage();

  if (syncedIds.length > 0) {
    await loadAllData();
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
  if (state.settings.fontSize) {
    document.body.style.fontSize = state.settings.fontSize + "px";
  }
  // derive a secondary accent shade for subtle UI accents
  try {
    const accent2 = shadeHexColor(state.settings.accent, -12);
    document.documentElement.style.setProperty("--accent-2", accent2);
  } catch (e) {
    document.documentElement.style.setProperty("--accent-2", state.settings.accent);
  }
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
  try {
  const activeElement = document.activeElement;
  const activeId = activeElement?.id || activeElement?.dataset?.search;
  const activeValue = activeElement?.value || "";

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

  if (activeId && activeElement?.matches && 
      (activeElement.matches("[data-search]") || activeElement.matches(".search-input"))) {
    const input = document.querySelector(`[data-search="${activeId}"]`) || document.getElementById(activeId);
    if (input && input.value === activeValue) {
      const selStart = activeElement?.selectionStart;
      const selEnd = activeElement?.selectionEnd;
      input.focus();
      if (selStart !== undefined && selEnd !== undefined) {
        input.setSelectionRange(selStart, selEnd);
      }
    }
  }
  } catch (err) {
    console.error("Error en render:", err);
    root.innerHTML = `<div style="padding:20px;color:red;">Error: ${err.message}</div>`;
  }
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
          <button class="button" type="submit">Iniciar Sesión</button>
        </form>
        <!-- Demo users removed -->
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
      <div class="accessibility-floating">
        <button class="floating-btn" type="button" data-action="decrease-font" title="Reducir texto">A-</button>
        <button class="floating-btn" type="button" data-action="increase-font" title="Aumentar texto">A+</button>
      </div>
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
  const stats = [
    { label: "Ventas Hoy", value: ventasHoy, trend: `${numVentas} facturas`, icon: iconMoney(), tone: "" },
    { label: "Facturas", value: numVentas, trend: `${numVentas} emitidas`, icon: iconCube(), tone: "purple" },
    { label: "Alertas Stock", value: d.productos_stock_bajo || 0, trend: `prod. bajos`, icon: iconWarning(), tone: "red" },
  ];

  const weekly = (data.weeklySales || []).length > 0 ? data.weeklySales : [
    { day: "Lun", value: 0 },
    { day: "Mar", value: 0 },
    { day: "Mié", value: 0 },
    { day: "Jue", value: 0 },
    { day: "Vie", value: 0 },
    { day: "Sáb", value: 0 },
    { day: "Dom", value: 0 }
  ];
  const topProd = (data.topProducts || []).length > 0 ? data.topProducts : [];
  const maxValue = Math.max(...weekly.map(d => d.value), 1);
  const lowStock = (data.products || []).filter((item) => Number(item.stock_actual) <= Number(item.stock_minimo));

  return `
    <section class="view dashboard-view">
      <div class="page-head"><div><h2>Resumen de Ventas</h2><div class="eyebrow">Vista general del negocio</div></div></div>
      <div class="stats-grid">
        ${stats.map((stat) => `
          <article class="panel stat-card">
            <div>
              <div class="label">${stat.label}</div>
              <div class="value">${formatNumber(Math.round(stat.value))}</div>
              <div class="trend">↗ ${stat.trend}</div>
            </div>
            <div class="stat-icon ${stat.tone}">${stat.icon}</div>
          </article>
        `).join("")}
      </div>
      <div class="charts-grid">
        <section class="panel chart-card">
          <h3 class="chart-title">Ventas de la Semana</h3>
          <div class="chart-stage" id="bar-chart-container">
            <div class="bar-chart">
              ${(() => {
                const maxVal = Math.max(...weekly.map(d => d.value), 1);
                const containerHeight = 200;
                return weekly.map((item, index) => {
                  const pxHeight = Math.max(10, Math.round((item.value / maxVal) * containerHeight));
                  return `
                    <div class="bar-item" data-day="${item.day}" data-value="${item.value}" data-index="${index}">
                      <button class="js-bar" type="button" style="height:${pxHeight}px !important"></button>
                      <span class="bar-label">${item.day}</span>
                    </div>
                  `;
                }).join("");
              })()}
            </div>
            <div class="chart-tooltip" id="bar-tooltip"></div>
          </div>
        </section>
        <section class="panel pie-card">
          <h3 class="chart-title">Productos Más Vendidos</h3>
          <div class="pie-stage">
            <div class="pie-wrap">
              <svg class="pie-svg" viewBox="0 0 100 100">${renderPieSlices(topProd)}</svg>
              <div class="chart-tooltip" id="pie-tooltip"></div>
            </div>
            <div class="pie-legend">
              ${topProd.length > 0 ? topProd.map((item) => `
                <div class="pie-legend-item"><span class="dot" style="background:${item.color}"></span><span>${item.label}</span><span style="color:${item.color}">${item.value}%</span></div>
              `).join("") : "<p style='color:#888;padding:20px;'>Sin datos de ventas</p>"}
            </div>
          </div>
        </section>
      </div>
      <section class="panel table-card">
        <h3>Productos con Stock Bajo</h3>
        <div class="table-responsive">
          <table>
            <thead><tr><th>Producto</th><th>Stock Actual</th><th>Stock Mínimo</th></tr></thead>
            <tbody>
              ${lowStock.map((item) => `
                <tr>
                  <td>${item.nombre}</td>
                  <td><span class="chip ${Number(item.stock_actual) <= Number(item.stock_minimo) ? "danger" : "warning"}">${item.stock_actual}</span></td>
                  <td>${item.stock_minimo}</td>
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
  const products = data.products.filter((product) => product.activo !== false && (!query || [product.nombre, product.codigo, getProductCategoryLabel(product)].some((value) => value && value.toLowerCase().includes(query))));
  const totals = cartTotals();
  const cartItems = state.cart.map((item) => ({ ...item, product: data.products.find((p) => String(p.id) === String(item.id)) }));

return `
    <section class="view pos-view">
      <div class="page-head"><div><h2>Punto de Venta</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div></div>
      <div class="pos-layout">
        <div class="pos-inventory">
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
        <div class="pos-cart-panel">
          <aside class="panel cart-card">
            <h3>Resumen</h3>
            <div class="sale-summary">
              <div class="cart-footer">
                <div class="cart-total-line"><span>Subtotal:</span><strong>${formatCurrency(totals.subtotal)}</strong></div>
                <div class="cart-total-line"><span>TOTAL:</span><strong style="font-size:1.4rem;color:var(--accent)">${formatCurrency(totals.total)}</strong></div>
              </div>
              <div class="payment-grid" style="margin-top:10px;">
                <button type="button" class="payment-option ${state.paymentMethod === "efectivo" ? "active" : ""}" data-action="payment-method" data-method="efectivo">${iconMoney()} <span>Efectivo</span></button>
                <button type="button" class="payment-option ${state.paymentMethod === "tarjeta" ? "active" : ""}" data-action="payment-method" data-method="tarjeta">${iconCard()} <span>Tarjeta</span></button>
              </div>
              <div class="payment-field" style="margin-top:10px;${state.paymentMethod === "efectivo" ? "" : "display:none;"}">
                <label for="cash-input"><strong>Efectivo Recibido</strong></label>
                <input class="input" id="cash-input" data-payment-field="cash" type="text" inputmode="decimal" placeholder="0" value="${escapeAttr(state.cashReceived)}" />
              </div>
              <div style="margin-top:12px;">
                <button class="button" type="button" data-action="finalize-sale" ${canFinalizeSale() ? "" : "disabled"} style="width:100%;">${iconPrinter()} Finalizar Venta</button>
              </div>
            </div>
          </aside>
          <aside class="panel cart-card">
            <h3>Productos</h3>
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
          </aside>
        </div>
      </div>
    </section>
  `;
}

function inventoryView() {
  const query = state.search.inventory.trim().toLowerCase();
  const category = state.search.category;
  const hasUncategorized = data.products.some((item) => getProductCategoryLabel(item) === "Sin categoría");
  const categories = [
    "all",
    ...data.categories.map((item) => item.nombre).filter(Boolean),
    ...(hasUncategorized ? ["Sin categoría"] : []),
  ];
  const uniqueCategories = ["all", ...new Set(categories.filter(Boolean).map((item) => String(item)))];
  const rows = data.products.filter((product) => product.activo !== false && (!query || [product.nombre, product.codigo, getProductCategoryLabel(product)].some((value) => value && value.toLowerCase().includes(query))) && (category === "all" || (category === "Sin categoría" ? getProductCategoryLabel(product) === "Sin categoría" : getProductCategoryLabel(product) === category)));

  return `
    <section class="view inventory-view">
      <div class="page-head">
        <div><h2>Inventario</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div>
        <div class="section-actions"><button class="button ghost" type="button" data-action="bulk-upload">Carga Masiva</button><button class="button" type="button" data-action="new-product">Nuevo Producto</button></div>
      </div>
      <section class="panel pad inventory-list">
        <div class="toolbar">
          <div class="search-wrap"><span class="search-icon">${iconSearch()}</span><input class="search-input" data-search="inventory" type="text" placeholder="Buscar por nombre o código..." value="${escapeAttr(state.search.inventory)}" /></div>
          <select class="select" data-search-category="inventory">${uniqueCategories.map((item) => `<option value="${item}" ${item === category ? "selected" : ""}>${item === "all" ? "Todas las categorías" : item}</option>`).join("")}</select>
        </div>
        <div class="table-responsive" style="margin-top:14px;">
          <table>
            <thead><tr><th>Producto</th><th>Categoría</th><th>Stock</th><th>Costo</th><th>Precio</th><th>Proveedor</th><th>Acciones</th></tr></thead>
            <tbody>
              ${rows.map((product) => {
                const proveedor = data.suppliers.find(s => String(s.id) === String(product.proveedor));
                return `
                <tr>
                  <td><strong>${product.nombre}</strong><br><span class="subtle-text">${product.codigo}</span></td>
                  <td><span class="chip neutral">${getProductCategoryLabel(product)}</span></td>
                  <td><span class="chip ${product.stock_actual <= product.stock_minimo ? "danger" : "success"}">${product.stock_actual}</span></td>
                  <td>${formatCurrency(product.costo)}</td>
                  <td>${formatCurrency(product.precio_venta)}</td>
                  <td>${proveedor ? proveedor.nombre : "-"}</td>
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
  const active = data.cashiers.filter((c) => c.is_logged_in === true).length;

  return `
    <section class="view cashiers-view">
      <div class="page-head">
        <div><h2>Cajeros</h2><div class="eyebrow">${active} de ${total} activos</div></div>
        <div class="section-actions"><button class="button ghost" type="button" data-action="refresh-cashiers">↻ Actualizar</button><button class="button" type="button" data-action="new-cashier">Nuevo Cajero</button></div>
      </div>
      <section class="panel cashiers-table">
        <div class="toolbar" style="margin-bottom:14px;"><div class="search-wrap"><span class="search-icon">${iconSearch()}</span><input class="search-input" data-search="cashier" type="text" placeholder="Buscar cajeros..." value="${escapeAttr(state.search.cashier)}" /></div></div>
        <div class="table-responsive">
          <table>
            <thead><tr><th>Cajero</th><th>Usuario</th><th>Contacto</th><th>Rol</th><th>Sesión</th><th>Acciones</th></tr></thead>
            <tbody>
              ${cashiers.map((cashier) => `
                <tr>
                  <td><strong>${cashier.first_name || cashier.username} ${cashier.last_name || ""}</strong></td>
                  <td><span class="chip neutral">${cashier.username}</span></td>
                  <td>${cashier.telefono || "Sin teléfono"}</td>
                  <td><span class="chip">${cashier.rol}</span></td>
                  <td><span class="chip ${cashier.is_logged_in === true ? "success" : "danger"}">${cashier.is_logged_in === true ? "Conectado" : "Desconectado"}</span></td>
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
  const reporte = data.reporte || {};
  const fechaActual = reporte.fecha || new Date().toISOString().split('T')[0];

  return `
    <section class="view reports-view">
      <div class="page-head">
        <div><h2>Reportes</h2><div class="eyebrow">Gestión de ventas y gastos</div></div>
        <div class="section-actions">
          <button class="button" type="button" data-action="new-expense">+ Gasto</button>
        </div>
      </div>

      <div class="toolbar">
        <div class="fecha-selector">
          <label>Fecha:</label>
          <input type="date" id="reporte-fecha" value="${fechaActual}" class="fecha-input" />
          <button class="button" type="button" data-action="buscar-reporte">Buscar</button>
        </div>
      </div>

      <div class="stats-grid">
        <article class="panel stat-card">
          <div><div class="label">Ventas del Día</div><div class="value">${formatCurrency(reporte.total_ventas_dia || 0)}</div><div class="trend">${reporte.num_ventas_dia || 0} ventas</div></div>
          <div class="stat-icon green">${iconMoney()}</div>
        </article>
        <article class="panel stat-card">
          <div><div class="label">Gastos del Día</div><div class="value">${formatCurrency(reporte.total_gastos_dia || 0)}</div><div class="trend">${(reporte.gastos_dia || []).length} gastos</div></div>
          <div class="stat-icon red">${iconWarning()}</div>
        </article>
        <article class="panel stat-card">
          <div><div class="label">Utilidad del Día</div><div class="value ${(reporte.utilidad_dia || 0) >= 0 ? 'pos' : 'neg'}">${formatCurrency(reporte.utilidad_dia || 0)}</div><div class="trend">Ventas - Gastos</div></div>
          <div class="stat-icon ${(reporte.utilidad_dia || 0) >= 0 ? 'green' : 'red'}">${iconChart()}</div>
        </article>
      </div>

      <div class="reports-grid">
        <section class="panel">
          <h3>Ventas del Día</h3>
          <div class="table-responsive">
            <table>
              <thead><tr><th>Factura</th><th>Total</th><th>Método</th></tr></thead>
              <tbody>
                ${(reporte.ventas_dia || []).map(v => `<tr><td>${v.numero_factura || 'N/A'}</td><td>${formatCurrency(v.total)}</td><td><span class="chip">${v.medio_pago || 'efectivo'}</span></td><td><button class="button small" type="button" data-action="view-sale" data-id="${v.id}">Ver</button></td></tr>`).join("") || '<tr><td colspan="4">Sin ventas</td></tr>'}
              </tbody>
            </table>
          </div>
        </section>
        <section class="panel">
          <h3>Gastos del Día</h3>
          <div class="table-responsive">
            <table>
              <thead><tr><th>Tipo</th><th>Monto</th><th>Descripción</th></tr></thead>
              <tbody>
                ${(reporte.gastos_dia || []).map(g => `<tr><td><span class="chip">${g.tipo}</span></td><td>${formatCurrency(g.monto)}</td><td>${g.descripcion || '-'}</td></tr>`).join("") || '<tr><td colspan="3">Sin gastos</td></tr>'}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section class="panel month-summary">
        <h3>Resumen del Mes</h3>
        <div class="month-stats">
          <div class="month-stat"><div class="label">Ventas</div><div class="value">${formatCurrency(reporte.total_ventas_mes || 0)}</div></div>
          <div class="month-stat"><div class="label">Gastos</div><div class="value gasto">${formatCurrency(reporte.total_gastos_mes || 0)}</div></div>
          <div class="month-stat"><div class="label">Utilidad</div><div class="value ${(reporte.utilidad_mes || 0) >= 0 ? 'pos' : 'neg'}">${formatCurrency(reporte.utilidad_mes || 0)}</div></div>
        </div>
      </section>
    </section>
  `;
}

function settingsView() {
  return `
    <section class="view settings-view">
      <div class="page-head"><div><h2>Configuración</h2><div class="eyebrow">${getCurrentDateLabel()}</div></div></div>
      <div class="settings-layout">
        <section class="settings-grid">
          <div class="panel settings-card"><h3>Configuración del Sistema</h3><p class="subtle-text">Personaliza la experiencia del panel.</p></div>
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
        </section>
        <aside class="panel settings-preview">
          <h3>Accesibilidad</h3>
          <div class="accessibility-controls">
            <button class="button" type="button" data-action="decrease-font">A-</button>
            <button class="button" type="button" data-action="increase-font">A+</button>
          </div>
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
  document.querySelectorAll(".bar-item").forEach((item) => {
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
  const target = event.target.closest("[data-action], [data-view]");
  if (!target) return;

  if (target.dataset.action === "modal-close") {
    closeModal();
    return;
  }

  if (target.dataset.action === "modal-confirm-yes") {
    try { if (modalResolver) modalResolver(true); } catch(e) {}
    modalResolver = null;
    closeModal();
    return;
  }

  // demo buttons removed — no auto-fill/login for demo users

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
      break;
    case "increase-font":
      state.settings.fontSize = (state.settings.fontSize || 14) + 2;
      if (state.settings.fontSize > 24) state.settings.fontSize = 24;
      document.body.style.fontSize = state.settings.fontSize + "px";
      saveSettings();
      break;
    case "decrease-font":
      state.settings.fontSize = (state.settings.fontSize || 14) - 2;
      if (state.settings.fontSize < 10) state.settings.fontSize = 10;
      document.body.style.fontSize = state.settings.fontSize + "px";
      saveSettings();
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
      if (state.paymentMethod === "tarjeta") {
        const total = cartTotals().total.toFixed(2);
        state.cashReceived = Number(total).toLocaleString("es-ES");
      } else if (state.paymentMethod === "efectivo") {
        state.cashReceived = "";
      }
      render();
      setTimeout(() => {
        const btn = document.querySelector("[data-action='finalize-sale']");
        if (btn) btn.disabled = !canFinalizeSale();
      }, 0);
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
    case "refresh-cashiers":
      apiCall("/usuarios/").then((cashiers) => {
        data.cashiers = cashiers;
        render();
        toast("Cajeros actualizados", "success");
      }).catch(() => toast("Error al actualizar", "danger"));
      break;
    case "new-product":
      showModal(formNewProduct());
      break;
    case "new-supplier":
      showModal(formNewSupplier());
      break;
    case "bulk-upload":
      showModal(bulkUploadModal());
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
    case "confirm-bulk-import":
      confirmBulkImport();
      break;
    case "download-template":
      downloadTemplate();
      break;
    case "new-expense":
      showModal(formNewExpense());
      break;
    case "buscar-reporte":
      const fechaInput = document.getElementById("reporte-fecha");
      if (fechaInput) {
        loadReportData(fechaInput.value).then(() => render());
      }
      break;
    case "view-sale":
      viewSaleReceipt(target.dataset.id);
      break;
    case "confirm-delete-prod":
      confirmDeleteProduct(target.dataset.id);
      break;
    default:
      if (target.dataset.action?.startsWith("edit-") || target.dataset.action?.startsWith("delete-") || target.dataset.action === "view-order") {
        toast(actionMessage(target.dataset.action), target.dataset.action.includes("delete") ? "danger" : "warning");
      }
  }
}

async function handleSubmit(event) {
  // Evitar recarga accidental por envío de formularios
  try {
    event.preventDefault();
  } catch (e) {
    /* ignore */
  }
  console.debug("handleSubmit -> target.id:", event.target && event.target.id);

  if (event.target.id === "login-form") {
    login(event.target.username.value.trim(), event.target.password.value);
    return;
  }

  if (event.target.id === "form-new-cashier") {
    const formData = new FormData(event.target);
    const userData = {
      username: formData.get("username"),
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name") || "",
      password: formData.get("password"),
      email: formData.get("email") || "",
      telefono: formData.get("telefono") || "",
      rol: formData.get("rol") || "vendedor",
    };
    closeModal();
    await createCashier(userData);
    return;
  }

  if (event.target.id === "form-new-product") {
    const formData = new FormData(event.target);
    const productData = {
      nombre: formData.get("nombre"),
      codigo: formData.get("codigo"),
      codigo_barras: formData.get("codigo_barras") || "",
      stock_actual: parseInt(formData.get("stock_actual") || 0),
      stock_minimo: parseInt(formData.get("stock_minimo") || 0),
      descripcion: formData.get("descripcion") || "",
      precio_venta: parseFloat(formData.get("precio_venta")),
      costo: parseFloat(formData.get("costo") || 0),
      categoria: formData.get("categoria") || null,
      proveedor: formData.get("proveedor") || null,
      activo: formData.get("activo") === "on",
    };
    closeModal();
    await createProduct(productData);
    return;
  }

  if (event.target.id === "form-edit-product") {
    const formData = new FormData(event.target);
    const productId = event.target.dataset.id;
    const productData = {
      nombre: formData.get("nombre"),
      codigo: formData.get("codigo"),
      codigo_barras: formData.get("codigo_barras") || "",
      descripcion: formData.get("descripcion") || "",
      stock_actual: parseInt(formData.get("stock_actual") || 0),
      stock_minimo: parseInt(formData.get("stock_minimo") || 0),
      costo: parseFloat(formData.get("costo") || 0),
      precio_venta: parseFloat(formData.get("precio_venta") || 0),
      categoria: formData.get("categoria") || null,
      proveedor: formData.get("proveedor") || null,
      activo: formData.get("activo") === "on",
    };
    closeModal();
    apiCall(`/productos/${productId}/`, "PATCH", productData)
      .then(() => {
        const idx = data.products.findIndex(p => String(p.id) === String(productId));
        if (idx !== -1) data.products[idx] = { ...data.products[idx], ...productData };
        render();
        toast("Producto actualizado.", "success");
      })
      .catch((e) => toast(`Error: ${e.message}`, "danger"));
    return;
  }

  if (event.target.id === "form-new-supplier") {
    const formData = new FormData(event.target);
    const supplierData = {
      nombre: formData.get("nombre"),
      telefono: formData.get("telefono") || "",
      correo: formData.get("correo") || "",
      direccion: formData.get("direccion") || "",
      activo: true,
    };
    closeModal();
    await createSupplier(supplierData);
    return;
  }

  if (event.target.id === "form-edit-supplier") {
    const formData = new FormData(event.target);
    const supplierId = event.target.dataset.id;
    const supplierData = {
      nombre: formData.get("nombre"),
      documento_fiscal: formData.get("documento_fiscal") || "",
      contacto: formData.get("contacto") || "",
      telefono: formData.get("telefono") || "",
      correo: formData.get("correo") || "",
      direccion: formData.get("direccion") || "",
      activo: formData.get("activo") === "on",
    };
    closeModal();
    apiCall(`/proveedores/${supplierId}/`, "PATCH", supplierData)
      .then(() => {
        const idx = data.suppliers.findIndex(s => String(s.id) === String(supplierId));
        if (idx !== -1) data.suppliers[idx] = { ...data.suppliers[idx], ...supplierData };
        render();
        toast("Proveedor actualizado.", "success");
      })
      .catch((e) => toast(`Error: ${e.message}`, "danger"));
    return;
  }

  if (event.target.id === "form-edit-cashier") {
    const formData = new FormData(event.target);
    const cashierId = event.target.dataset.id;
    const password = formData.get("password") || "";
    const cashierData = {
      first_name: formData.get("first_name") || "",
      last_name: formData.get("last_name") || "",
      username: formData.get("username") || "",
      email: formData.get("email") || "",
      telefono: formData.get("telefono") || "",
      rol: formData.get("rol") || "vendedor",
    };
    if (password) cashierData.password = password;
    closeModal();
    apiCall(`/usuarios/${cashierId}/`, "PATCH", cashierData)
      .then(() => {
        const idx = data.cashiers.findIndex(c => String(c.id) === String(cashierId));
        if (idx !== -1) data.cashiers[idx] = { ...data.cashiers[idx], ...cashierData };
        render();
        toast("Cajero actualizado.", "success");
      })
      .catch((e) => toast(`Error: ${e.message}`, "danger"));
    return;
  }

  if (event.target.id === "modal-prompt-form") {
    const formData = new FormData(event.target);
    const value = formData.get("value");
    try { if (modalResolver) modalResolver(value === null ? null : String(value).trim()); } catch(e) {}
    modalResolver = null;
    closeModal();
    return;
  }

  if (event.target.id === "bulk-upload-form") {
    handleBulkUpload(event);
    return;
  }

  if (event.target.id === "form-new-expense") {
    const formData = new FormData(event.target);
    const gastoData = {
      monto: parseFloat(formData.get("monto")),
      tipo: formData.get("tipo"),
      descripcion: formData.get("descripcion") || "",
    };
    closeModal();
    await createGasto(gastoData);
    return;
  }
}

function handleInput(event) {
  const { target } = event;
  const isSearchInput = target.matches("[data-search]") || target.matches(".search-input");
  const isPaymentField = target.matches("[data-payment-field='cash']");

  if (!isSearchInput && !isPaymentField) return;

  if (isPaymentField) {
    let value = target.value.replace(/[^\d.]/g, "");
    const parts = value.split(".");
    if (parts.length > 2) value = parts[0] + "." + parts.slice(1).join("");
    if (parts[1] && parts[1].length > 2) value = parts[0] + "." + parts[1].slice(0, 2);
    if (parts[0]) parts[0] = Number(parts[0]).toLocaleString("es-ES");
    const formattedValue = parts[0] + (parts[1] ? "." + parts[1] : "");
    state.cashReceived = formattedValue;
    target.value = formattedValue;
    const btn = document.querySelector("[data-action='finalize-sale']");
    if (btn) btn.disabled = !canFinalizeSale();
    return;
  }

  if (target.matches("[data-search='pos']")) {
    state.search.pos = target.value;

    // Auto-agregar por código numérico
    const searchValue = target.value.trim();
    if (/^\d+$/.test(searchValue) && searchValue.length >= 2) {
      const product = data.products.find(p =>
        p.codigo === searchValue ||
        p.codigo_barras === searchValue
      );
      if (product) {
        addToCart(product.id);
        target.value = "";
        state.search.pos = "";
        toast(`Agregado: ${product.nombre}`, "success");
      }
    }
  } else if (target.matches("[data-search='inventory']")) {
    state.search.inventory = target.value;
  } else if (target.matches("[data-search='supplier']")) {
    state.search.supplier = target.value;
  } else if (target.matches("[data-search='cashier']")) {
    state.search.cashier = target.value;
  } else if (isPaymentField) {
    state.cashReceived = target.value;
    return;
  }

  clearTimeout(renderTimeout);
  renderTimeout = setTimeout(() => render(), 150);
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
  loginBackend(username, password).then((backendSuccess) => {
    if (backendSuccess) {
      toast(`Bienvenido, ${state.session.name}.`, "success");
      return;
    }
    toast("Credenciales inválidas. Usa admin / admin123", "danger");
    render();
  });
}

async function logout() {
  // Marcar usuario como desconectado en el backend
  if (state.token) {
    await apiCall("/usuarios/logout_status/", "POST").catch(() => {});
  }
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
  const product = data.products.find((item) => String(item.id) === String(productId));
  if (!product) return;
  if (product.activo === false) {
    toast(`El producto ${product.nombre} está inactivo y no se puede vender.`, "warning");
    return;
  }
  const existing = state.cart.find((item) => String(item.id) === String(productId));
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
  const cash = parseFloat(state.cashReceived.replace(/\./g, ""));
  const total = cartTotals().total;
  return Number.isFinite(cash) && cash >= total;
}

async function finalizeSale() {
  if (!state.cart.length) {
    toast("El carrito está vacío.", "warning");
    return;
  }
  if (state.paymentMethod === "efectivo") {
    const cash = parseFloat(state.cashReceived.replace(/\./g, ""));
    const total = cartTotals().total;
    if (!Number.isFinite(cash) || cash < total) {
      toast(`El efectivo recibido es menor al total ($${formatCurrency(total).replace('$', '')}).`, "danger");
      return;
    }
  }
  const turnoId = await getOrCreateTurnoCaja();
  if (!turnoId) {
    toast("Error: No se pudo abrir un turno de caja.", "danger");
    return;
  }
  const saleData = {
    turno_caja: turnoId,
    medio_pago: state.paymentMethod === "efectivo" ? "efectivo" : state.paymentMethod === "tarjeta" ? "tarjeta" : "transferencia",
    monto_pagado: parseFloat(state.cashReceived.replace(/\./g, "")) || cartTotals().total,
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

function modalPromptHtml(label, defaultValue = "") {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>${escapeHtml(label)}</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="modal-prompt-form" class="modal-form">
        <div class="form-group">
          <input class="input" name="value" id="modal-prompt-input" type="text" value="${escapeAttr(defaultValue)}" />
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Aceptar</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function modalConfirmHtml(message) {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Confirmar</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <div class="modal-form" style="padding:16px">
        <p>${escapeHtml(message)}</p>
        <div class="form-actions">
          <button class="button" type="button" data-action="modal-confirm-yes">Aceptar</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </div>
    </div>
  `;
}

function bulkUploadModal() {
  return `
    <div class="modal-dialog" style="max-width:600px;">
      <div class="modal-header">
        <h2>Carga Masiva de Productos</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <div class="modal-form" style="padding:16px">
        <div style="margin-bottom:16px;">
          <p style="margin-bottom:12px;"><strong>Formato del archivo:</strong></p>
          <p style="font-size:12px;color:#666;">El archivo debe ser CSV o Excel (.xlsx) con las siguientes columnas:</p>
          <ul style="font-size:12px;color:#666;margin:8px 0 16px 20px;">
            <li><code>codigo</code> - Código único del producto (obligatorio)</li>
            <li><code>nombre</code> - Nombre del producto (obligatorio)</li>
            <li><code>precio_venta</code> - Precio de venta (obligatorio)</li>
            <li><code>costo</code> - Costo del producto (opcional)</li>
            <li><code>stock_actual</code> - Stock actual (opcional)</li>
            <li><code>stock_minimo</code> - Stock mínimo (opcional)</li>
            <li><code>descripcion</code> - Descripción (opcional)</li>
            <li><code>codigo_barras</code> - Código de barras (opcional)</li>
            <li><code>categoria</code> - Nombre de categoría (opcional)</li>
            <li><code>proveedor</code> - Nombre del proveedor (opcional)</li>
          </ul>
          <button class="button ghost" type="button" data-action="download-template">Descargar Plantilla</button>
        </div>
        <form id="bulk-upload-form" enctype="multipart/form-data">
          <div class="form-group">
            <label class="field-label">Seleccionar archivo (CSV o XLSX)</label>
            <input type="file" name="archivo" id="bulk-file" accept=".csv,.xlsx,.xls" required style="width:100%;padding:8px;border:1px solid #ddd;border-radius:4px;" />
          </div>
          <div class="form-actions">
            <button class="button" type="submit">Vista Previa</button>
            <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
          </div>
        </form>
        <div id="bulk-preview-container" style="display:none;margin-top:16px;">
          <h4 style="margin-bottom:8px;">Vista Previa</h4>
          <div id="bulk-preview-results" style="max-height:300px;overflow-y:auto;font-size:12px;"></div>
          <div class="form-actions" style="margin-top:16px;">
            <button class="button" type="button" data-action="confirm-bulk-import">Confirmar Importación</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

let bulkFileData = null;

async function handleBulkUpload(event) {
  event.preventDefault();
  const fileInput = document.getElementById("bulk-file");
  const file = fileInput.files[0];
  if (!file) {
    toast("Selecciona un archivo", "warning");
    return;
  }

  const formData = new FormData();
  formData.append("archivo", file);
  formData.append("modo", "preview");

  try {
    toast("Procesando archivo...", "info");
    const result = await apiCall("/productos/importar/", "POST", formData, true);
    bulkFileData = result;

    const container = document.getElementById("bulk-preview-container");
    const resultsDiv = document.getElementById("bulk-preview-results");
    container.style.display = "block";

    let html = `<p><strong>Total filas:</strong> ${result.total_filas} | <strong>Procesados:</strong> ${result.procesados} | <strong>Errores:</strong> ${result.errores?.length || 0}</p>`;

    if (result.errores && result.errores.length > 0) {
      html += `<div style="color:red;margin-bottom:8px;"><strong>Errores:</strong><ul>${result.errores.map(e => `<li>Fila ${e.fila}: ${e.error}</li>`).join("")}</ul></div>`;
    }

    html += `<table style="width:100%;border-collapse:collapse;font-size:11px;">
      <thead><tr style="background:#f0f0f0;"><th>Código</th><th>Nombre</th><th>Precio</th><th>Stock</th><th>Acción</th></tr></thead>
      <tbody>`;

    result.resultados.forEach(r => {
      const rowStyle = r.existe ? "background:#fff8e1;" : "";
      html += `<tr style="${rowStyle}">
        <td>${escapeHtml(r.codigo)}</td>
        <td>${escapeHtml(r.nombre)}</td>
        <td>${formatCurrency(r.precio_venta)}</td>
        <td>${r.stock_actual}</td>
        <td>${r.existe ? '<span class="chip warning">Actualizar</span>' : '<span class="chip success">Crear</span>'}</td>
      </tr>`;
    });

    html += "</tbody></table>";
    if (result.total_filas > 50) {
      html += `<p style="margin-top:8px;color:#666;">Mostrando primeros 50 de ${result.total_filas} filas</p>`;
    }

    resultsDiv.innerHTML = html;
    toast("Preview cargado. Revisa los datos y confirma.", "success");
  } catch (e) {
    toast(`Error: ${e.message}`, "danger");
  }
}

async function confirmBulkImport() {
  if (!bulkFileData) {
    toast("No hay datos para importar", "warning");
    return;
  }

  const fileInput = document.getElementById("bulk-file");
  const file = fileInput.files[0];
  if (!file) {
    toast("Selecciona un archivo", "warning");
    return;
  }

  const formData = new FormData();
  formData.append("archivo", file);
  formData.append("modo", "importar");

  try {
    toast("Importando productos...", "info");
    const result = await apiCall("/productos/importar/", "POST", formData, true);

    let msg = `Importación completada: ${result.procesados} productos`;
    if (result.errores && result.errores.length > 0) {
      msg += `, ${result.errores.length} errores`;
    }
    toast(msg, result.errores?.length > 0 ? "warning" : "success");

    closeModal();
    await loadAllData();
    render();
  } catch (e) {
    toast(`Error: ${e.message}`, "danger");
  }
}

function downloadTemplate() {
  const csvContent = "codigo,nombre,precio_venta,costo,stock_actual,stock_minimo,descripcion,codigo_barras,categoria,proveedor\nPROD001,Producto Ejemplo,100.00,50.00,10,5,Descripcion del producto,1234567890123,Electronica,Proveedor A\nPROD002,Otro Producto,200.00,100.00,20,10,Otra descripcion,9876543210987,Alimentos,Proveedor B";
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "plantilla_productos.csv";
  link.click();
}

function modalPrompt(label, defaultValue = "") {
  return new Promise((resolve) => {
    modalResolver = resolve;
    showModal(modalPromptHtml(label, defaultValue));
    // focus input after render
    setTimeout(() => {
      const el = document.getElementById("modal-prompt-input");
      if (el) el.focus();
    }, 50);
  });
}

function modalConfirm(message) {
  return new Promise((resolve) => {
    modalResolver = resolve;
    showModal(modalConfirmHtml(message));
  });
}

async function promptIfCancelled(label, currentValue = "") {
  const v = await modalPrompt(label, currentValue);
  return v === null ? null : String(v).trim();
}


async function editProduct(productId) {
  const product = data.products.find((item) => String(item.id) === String(productId));
  if (!product) return;
  showModal(formEditProduct(product));
}

function deleteProduct(productId) {
  const product = data.products.find((item) => String(item.id) === String(productId));
  if (!product) return;

  showModal(`
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Confirmar eliminación</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <div class="modal-form" style="padding:20px">
        <p style="margin-bottom:16px;">¿Estás seguro de eliminar el producto <strong>${product.nombre}</strong>?</p>
        <p style="color:var(--danger);font-size:12px;margin-bottom:16px;">Esta acción no se puede deshacer.</p>
        <div class="form-actions" style="display:flex;gap:10px;">
          <button class="button danger" type="button" data-action="confirm-delete-prod" data-id="${productId}">Sí, eliminar</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </div>
    </div>
  `);
}

function confirmDeleteProduct(productId) {
  apiCall(`/productos/${productId}/`, "DELETE")
    .then(() => {
      closeModal();
      loadAllData().then(() => {
        toast("Producto eliminado.", "success");
        render();
      });
    })
    .catch((e) => {
      toast(`Error: ${e.message}`, "danger");
    });
}

async function editSupplier(supplierId) {
  const supplier = data.suppliers.find((item) => String(item.id) === String(supplierId));
  if (!supplier) return;
  showModal(formEditSupplier(supplier));
}

async function deleteSupplier(supplierId) {
  const supplier = data.suppliers.find((item) => String(item.id) === String(supplierId));
  if (!supplier) return;
  if (!(await modalConfirm(`Eliminar proveedor ${supplier.nombre}?`))) return;
  await apiCall(`/proveedores/${supplierId}/`, "DELETE");
  await loadAllData();
  toast("Proveedor eliminado.", "success");
  render();
}

async function editCashier(cashierId) {
  const cashier = data.cashiers.find((item) => String(item.id) === String(cashierId));
  if (!cashier) return;
  showModal(formEditCashier(cashier));
}

async function deleteCashier(cashierId) {
  const cashier = data.cashiers.find((item) => String(item.id) === String(cashierId));
  if (!cashier) return;
  if (!(await modalConfirm(`Eliminar cajero ${cashier.username}?`))) return;
  try {
    await apiCall(`/usuarios/${cashierId}/`, "DELETE");
    await loadAllData();
    toast("Cajero eliminado.", "success");
    render();
  } catch (e) {
    toast(`Error: ${e.message}`, "danger");
  }
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
  // if there is a pending modal resolver, resolve as cancelled (null/false)
  if (modalResolver) {
    try { modalResolver(null); } catch (e) {}
    modalResolver = null;
  }
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
        <div class="form-group">
          <label>Rol</label>
          <select class="input" name="rol" required>
            <option value="vendedor">Vendedor/Cajero</option>
            <option value="administrador">Administrador</option>
          </select>
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
          <label>Stock mínimo</label>
          <input class="input" name="stock_minimo" type="number" min="0" value="0" />
        </div>
        <div class="form-group">
          <label>Código de barras</label>
          <input class="input" name="codigo_barras" type="text" />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea class="input" name="descripcion" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label>Precio Venta</label>
          <input class="input" name="precio_venta" type="number" step="0.01" required />
        </div>
        <div class="form-group">
          <label>Costo</label>
          <input class="input" name="costo" type="number" step="0.01" />
        </div>
        <div class="form-group">
          <label>Categoría</label>
          <select class="input" name="categoria">
            ${optionList(data.categories, "", "Sin categoría")}
          </select>
        </div>
        <div class="form-group">
          <label>Proveedor</label>
          <select class="input" name="proveedor">
            ${optionList(data.suppliers, "", "Sin proveedor")}
          </select>
        </div>
        <div class="form-group" style="flex-direction:row;align-items:center;gap:10px;">
          <input type="checkbox" name="activo" checked />
          <label>Activo</label>
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Crear Producto</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function optionList(items, selectedId = "", placeholder = "Seleccionar...") {
  const selected = String(selectedId ?? "");
  return [`<option value="">${placeholder}</option>`, ...items.map((item) => {
    const itemId = String(item.id ?? "");
    const itemLabel = item.nombre || item.username || item.codigo || item.codigo_barras || item.name || itemId;
    return `<option value="${escapeAttr(itemId)}" ${itemId === selected ? "selected" : ""}>${escapeHtml(itemLabel)}</option>`;
  })].join("");
}

function formEditProduct(product) {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Editar Producto</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-edit-product" class="modal-form" data-id="${escapeAttr(product.id)}">
        <div class="form-group">
          <label>Nombre</label>
          <input class="input" name="nombre" type="text" required value="${escapeAttr(product.nombre || "")}" />
        </div>
        <div class="form-group">
          <label>Código</label>
          <input class="input" name="codigo" type="text" required value="${escapeAttr(product.codigo || "")}" />
        </div>
        <div class="form-group">
          <label>Código de barras</label>
          <input class="input" name="codigo_barras" type="text" value="${escapeAttr(product.codigo_barras || "")}" />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea class="input" name="descripcion" rows="3">${escapeHtml(product.descripcion || "")}</textarea>
        </div>
        <div class="form-group">
          <label>Stock actual</label>
          <input class="input" name="stock_actual" type="number" min="0" value="${escapeAttr(product.stock_actual ?? 0)}" />
        </div>
        <div class="form-group">
          <label>Stock mínimo</label>
          <input class="input" name="stock_minimo" type="number" min="0" value="${escapeAttr(product.stock_minimo ?? 0)}" />
        </div>
        <div class="form-group">
          <label>Costo</label>
          <input class="input" name="costo" type="number" step="0.01" value="${escapeAttr(product.costo ?? 0)}" />
        </div>
        <div class="form-group">
          <label>Precio venta</label>
          <input class="input" name="precio_venta" type="number" step="0.01" value="${escapeAttr(product.precio_venta ?? 0)}" />
        </div>
        <div class="form-group">
          <label>Categoría</label>
          <select class="input" name="categoria">
            ${optionList(data.categories, product.categoria?.id || "", "Sin categoría")}
          </select>
        </div>
        <div class="form-group">
          <label>Proveedor</label>
          <select class="input" name="proveedor">
            ${optionList(data.suppliers, product.proveedor?.id || "", "Sin proveedor")}
          </select>
        </div>
        <div class="form-group" style="flex-direction:row;align-items:center;gap:10px;">
          <input type="checkbox" name="activo" ${product.activo !== false ? "checked" : ""} />
          <label>Activo</label>
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Guardar Cambios</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function formEditSupplier(supplier) {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Editar Proveedor</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-edit-supplier" class="modal-form" data-id="${escapeAttr(supplier.id)}">
        <div class="form-group">
          <label>Nombre</label>
          <input class="input" name="nombre" type="text" required value="${escapeAttr(supplier.nombre || "")}" />
        </div>
        <div class="form-group">
          <label>Documento fiscal</label>
          <input class="input" name="documento_fiscal" type="text" value="${escapeAttr(supplier.documento_fiscal || "")}" />
        </div>
        <div class="form-group">
          <label>Contacto</label>
          <input class="input" name="contacto" type="text" value="${escapeAttr(supplier.contacto || "")}" />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input class="input" name="telefono" type="tel" value="${escapeAttr(supplier.telefono || "")}" />
        </div>
        <div class="form-group">
          <label>Correo</label>
          <input class="input" name="correo" type="email" value="${escapeAttr(supplier.correo || "")}" />
        </div>
        <div class="form-group">
          <label>Dirección</label>
          <input class="input" name="direccion" type="text" value="${escapeAttr(supplier.direccion || "")}" />
        </div>
        <div class="form-group" style="flex-direction:row;align-items:center;gap:10px;">
          <input type="checkbox" name="activo" ${supplier.activo !== false ? "checked" : ""} />
          <label>Activo</label>
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Guardar Cambios</button>
          <button class="button ghost" type="button" data-action="modal-close">Cancelar</button>
        </div>
      </form>
    </div>
  `;
}

function formEditCashier(cashier) {
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Editar Cajero</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-edit-cashier" class="modal-form" data-id="${escapeAttr(cashier.id)}">
        <div class="form-group">
          <label>Nombre</label>
          <input class="input" name="first_name" type="text" required value="${escapeAttr(cashier.first_name || "")}" />
        </div>
        <div class="form-group">
          <label>Apellido</label>
          <input class="input" name="last_name" type="text" value="${escapeAttr(cashier.last_name || "")}" />
        </div>
        <div class="form-group">
          <label>Usuario</label>
          <input class="input" name="username" type="text" required value="${escapeAttr(cashier.username || "")}" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input class="input" name="email" type="email" value="${escapeAttr(cashier.email || "")}" />
        </div>
        <div class="form-group">
          <label>Teléfono</label>
          <input class="input" name="telefono" type="tel" value="${escapeAttr(cashier.telefono || "")}" />
        </div>
        <div class="form-group">
          <label>Rol</label>
          <select class="input" name="rol" required>
            <option value="vendedor" ${cashier.rol === "vendedor" ? "selected" : ""}>Vendedor/Cajero</option>
            <option value="administrador" ${cashier.rol === "administrador" ? "selected" : ""}>Administrador</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nueva contraseña</label>
          <input class="input" name="password" type="password" placeholder="Dejar vacío para no cambiar" />
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Guardar Cambios</button>
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

function formNewExpense() {
  const tipos = ["electricidad", "agua", "internet", "alquiler", "sueldo", "mantenimiento", "insumos", "otro"];
  return `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2>Registrar Gasto</h2>
        <button class="modal-close" type="button" data-action="modal-close">×</button>
      </div>
      <form id="form-new-expense" class="modal-form">
        <div class="form-group">
          <label>Tipo de Gasto</label>
          <select class="input" name="tipo" required>
            ${tipos.map(t => `<option value="${t}">${t.charAt(0).toUpperCase() + t.slice(1)}</option>`).join("")}
          </select>
        </div>
        <div class="form-group">
          <label>Monto</label>
          <input class="input" name="monto" type="number" step="0.01" min="0" required />
        </div>
        <div class="form-group">
          <label>Descripción</label>
          <textarea class="input" name="descripcion" rows="2"></textarea>
        </div>
        <div class="form-actions">
          <button class="button" type="submit">Registrar Gasto</button>
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
    </body>
    </html>
  `;

  // Crear un elemento oculto para imprimir
  const printFrame = document.createElement('iframe');
  printFrame.style.display = 'none';
  printFrame.name = 'print-frame';
  document.body.appendChild(printFrame);

  const frameDoc = printFrame.contentWindow.document;
  frameDoc.open();
  frameDoc.write(receiptHtml);
  frameDoc.close();

  // Esperar a que cargue el contenido y luego imprimir
  printFrame.onload = function() {
    try {
      printFrame.contentWindow.focus();
      printFrame.contentWindow.print();
    } catch (e) {
      // Si falla, intentar con window.open
      const printWindow = window.open('', '_blank', 'width=400,height=600');
      if (printWindow) {
        printWindow.document.write(receiptHtml);
        printWindow.document.close();
        printWindow.print();
      }
    }
    // Limpiar después de unos segundos
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 3000);
  };
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

