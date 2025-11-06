// Tự động chọn API_BASE và gọi API
let API_BASE = null;
const AUTO_REFRESH_MS = 3000; // khớp Node-RED inject 3s

// Cookie helpers
function setCookie(name, value, days = 7) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}
function getCookie(name) {
  const v = `; ${document.cookie}`;
  const p = v.split(`; ${name}=`);
  if (p.length === 2) return p.pop().split(";").shift();
}
function delCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

// Fallback SHA-256: nếu trình duyệt không có WebCrypto (HTTP) thì trả null để server hash
async function trySha256(str) {
  if (window.crypto && window.crypto.subtle) {
    const enc = new TextEncoder();
    const h = await crypto.subtle.digest("SHA-256", enc.encode(str));
    return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  return null;
}

// Tự phát hiện API_BASE khả dụng
async function pickApiBase() {
  const qp = new URLSearchParams(location.search);
  const host = location.hostname;
  const override = qp.get("api") || window.API_URL || window.API_BASE;

  const norm = s => s.replace(/\/+$/, "");
  const candidates = [];

  if (override) candidates.push(norm(override));
  candidates.push("/api"); // Nginx reverse proxy (khuyến nghị)
  candidates.push(`http://${host}/api`);
  if (host !== "localhost" && host !== "127.0.0.1") {
    candidates.push("http://localhost:1880/api"); // gọi trực tiếp Node-RED (nếu mở cổng)
  }

  for (const base of candidates) {
    try {
      const url = `${base}/iot/public-latest?_=${Date.now()}`;
      const r = await fetch(url, { cache: "no-store" });
      if (r.ok) return base;
    } catch (_) {}
  }
  return "/api"; // phương án cuối
}
async function ensureApi() {
  if (!API_BASE) API_BASE = await pickApiBase();
  return API_BASE;
}

// UI refs
const el = {
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  btnLogin: document.getElementById("btn-login"),
  btnLogout: document.getElementById("btn-logout"),
  loginForm: document.getElementById("login-form"),
  userInfo: document.getElementById("user-info"),
  welcome: document.getElementById("welcome"),
  token: document.getElementById("token"),
  btnCopy: document.getElementById("btn-copy"),
  btnFetch: document.getElementById("btn-fetch"),
  autoRefresh: document.getElementById("auto-refresh"),
  temperature: document.getElementById("temperature"),
  updated_at: document.getElementById("updated_at"),
  status: document.getElementById("status"),
  raw: document.getElementById("raw"),
  grafanaUrl: document.getElementById("grafana-url"),
  btnOpenGraf: document.getElementById("btn-open-grafana"),
  grafBox: document.getElementById("grafana-box"),
  grafFrame: document.getElementById("grafana-frame")
};

let refreshTimer = null;

// Auth UI
function renderAuth() {
  const token = getCookie("token");
  const username = getCookie("username");
  if (token) {
    el.loginForm.style.display = "none";
    el.userInfo.style.display = "";
    el.welcome.textContent = `Xin chào, ${username || "user"}`;
    el.token.value = token;
  } else {
    el.loginForm.style.display = "";
    el.userInfo.style.display = "none";
    el.token.value = "";
  }
}

async function login() {
  try {
    await ensureApi();
    const u = (el.username.value || "").trim();
    const p = el.password.value || "";
    if (!u || !p) {
      alert("Nhập username và password (ví dụ: dat / 2004)");
      return;
    }
    el.status.textContent = "Đăng nhập...";

    // Cố gắng hash trên client; nếu không được, gửi password thường (server sẽ hash)
    const hashed = await trySha256(p);
    const body = hashed ? { username: u, password_sha256: hashed } : { username: u, password: p };

    const r = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!r.ok) {
      const t = await r.text();
      throw new Error(`Login fail: ${r.status} ${t}`);
    }
    const data = await r.json();
    setCookie("token", data.token, 7);
    setCookie("username", u, 7);
    el.token.value = data.token;
    renderAuth();
    el.status.textContent = "Đăng nhập thành công";
  } catch (e) {
    console.error(e);
    el.status.textContent = "Lỗi đăng nhập";
    alert(e.message);
  }
}

function logout() {
  delCookie("token");
  delCookie("username");
  renderAuth();
  el.status.textContent = "Đã đăng xuất";
}

async function fetchLatest() {
  try {
    await ensureApi();
    const token = getCookie("token") || el.token.value.trim();
    if (!token) {
      el.status.textContent = "Chưa có token (đăng nhập trước)";
      return;
    }
    el.status.textContent = "Đang gọi /iot/latest ...";
    const r = await fetch(`${API_BASE}/iot/latest`, {
      headers: { Authorization: "Bearer " + token }
    });
    if (!r.ok) {
      const t = await r.text();
      el.status.textContent = `Lỗi: ${r.status}`;
      el.raw.textContent = t;
      return;
    }
    const data = await r.json();
    el.temperature.textContent = (data.temperature ?? "--") + " °C";
    el.updated_at.textContent = data.updated_at ?? "--";
    el.raw.textContent = JSON.stringify(data, null, 2);
    el.status.textContent = "OK";
  } catch (e) {
    console.error(e);
    el.status.textContent = "Lỗi gọi API";
  }
}

function startAuto() {
  stopAuto();
  if (el.autoRefresh.checked) refreshTimer = setInterval(fetchLatest, AUTO_REFRESH_MS);
}
function stopAuto() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}
function copyToken() {
  if (!el.token.value) return;
  navigator.clipboard
    .writeText(el.token.value)
    .then(() => (el.status.textContent = "Đã copy token"))
    .catch(() => (el.status.textContent = "Không copy được token"));
}
function openGrafana() {
  const url = (el.grafanaUrl.value || "").trim();
  if (!url) {
    alert("Dán đường dẫn panel Grafana (/grafana/...)");
    return;
  }
  el.grafFrame.src = url;
  el.grafBox.style.display = "";
}

// Events
el.btnLogin.addEventListener("click", login);
el.btnLogout.addEventListener("click", logout);
el.btnFetch.addEventListener("click", fetchLatest);
el.autoRefresh.addEventListener("change", startAuto);
el.btnCopy.addEventListener("click", copyToken);
el.btnOpenGraf.addEventListener("click", openGrafana);
el.password.addEventListener("keyup", e => {
  if (e.key === "Enter") login();
});

// Init
(async () => {
  API_BASE = await ensureApi();
  // console.log("API_BASE =", API_BASE);
  renderAuth();
  startAuto();
  fetchLatest();
})();