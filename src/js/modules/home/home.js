import { authService } from "../auth/authService.js";

export function renderHome() {
  document.getElementById("login").disabled = true;
  document.getElementById("home").disabled = false;

  const content = document.getElementById("content");
  content.innerHTML = `
    <aside class="sidebar">
            <div class="logo-container">
                <a href="#" class="logo-header">
                    <div class="logo">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-4h4v4zm0-6H7V7h4v4zm6 6h-4v-4h4v4zm0-6h-4V7h4v4z"/>
                        </svg>
                    </div>
                    <div class="logo-text">Farma<span>Shop</span></div>
                </a>
            </div>

            <nav class="nav-menu">
                <a href="#" class="nav-item active">
                    <i>📊</i>
                    <span>Dashboard</span>
                </a>
                <a href="#" class="nav-item">
                    <i>📦</i>
                    <span>Productos</span>
                </a>
                <a href="#" class="nav-item">
                    <i>🛒</i>
                    <span>Pedidos</span>
                </a>
                <a href="#" class="nav-item">
                    <i>👥</i>
                    <span>Clientes</span>
                </a>
                <a href="#" class="nav-item">
                    <i>📈</i>
                    <span>Ventas</span>
                </a>
                <a href="#" class="nav-item">
                    <i>💊</i>
                    <span>Categorías</span>
                </a>
                <a href="#" class="nav-item">
                    <i>⚙️</i>
                    <span>Ajustes</span>
                </a>
                <a href="#" class="nav-item">
                    <i>❓</i>
                    <span>Ayuda</span>
                </a>
            </nav>

            <div class="user-info" id="userTrigger">
              <div class="user-avatar">JS</div>
              <div class="user-details">
                  <div class="user-name">${sessionStorage.getItem("name")}</div>
                  <div class="user-role">${sessionStorage.getItem("role")}</div>
              </div>

              <!-- User Dropdown Menu -->
              <div class="user-dropdown" id="userDropdown">
                  <a href="#" class="dropdown-item">
                      <i>👤</i>
                      <span>Ver Perfil</span>
                  </a>
                  <div class="dropdown-divider"></div>
                  <a href="#" id="logout" class="dropdown-item">
                      <i>🔒</i>
                      <span>Cerrar Sesión</span>
                  </a>
              </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main-content">
            <div class="header">
                <button class="mobile-menu-btn" id="mobileMenuBtn">☰</button>
                <h1 class="page-title">Dashboard</h1>
            </div>

            <!-- Stats Cards -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Ventas Totales</div>
                        <div class="stat-icon icon-sales">💰</div>
                    </div>
                    <div class="stat-value">$24,567</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Productos</div>
                        <div class="stat-icon icon-products">💊</div>
                    </div>
                    <div class="stat-value">1,248</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Pedidos</div>
                        <div class="stat-icon icon-orders">📦</div>
                    </div>
                    <div class="stat-value">342</div>
                </div>
                <div class="stat-card">
                    <div class="stat-header">
                        <div class="stat-title">Clientes</div>
                        <div class="stat-icon icon-customers">👥</div>
                    </div>
                    <div class="stat-value">1,892</div>
                </div>
            </div>

            <!-- Chart Section -->
            <div class="chart-container">
                <div class="chart-header">
                    <h2 class="chart-title">Ventas Mensuales</h2>
                    <div class="chart-actions">
                        <select>
                            <option>Últimos 30 días</option>
                            <option>Últimos 7 días</option>
                            <option>Hoy</option>
                        </select>
                    </div>
                </div>
                <div class="chart-placeholder">
                    Gráfico de ventas mensuales (implementación con biblioteca de gráficos)
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="recent-activity">
                <div class="activity-header">
                    <h2 class="activity-title">Actividad Reciente</h2>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon" style="background: rgba(37, 99, 235, 0.1); color: var(--primary-color);">🛒</div>
                        <div class="activity-content">
                            <div class="activity-description">Nuevo pedido recibido de Farmacia Central</div>
                            <div class="activity-time">Hace 2 horas</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--success-color);">💊</div>
                        <div class="activity-content">
                            <div class="activity-description">Producto "Paracetamol 500mg" actualizado en inventario</div>
                            <div class="activity-time">Hace 4 horas</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon" style="background: rgba(245, 158, 11, 0.1); color: var(--warning-color);">⚠️</div>
                        <div class="activity-content">
                            <div class="activity-description">Alerta de stock bajo para "Ibuprofeno 400mg"</div>
                            <div class="activity-time">Hace 6 horas</div>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon" style="background: rgba(239, 68, 68, 0.1); color: var(--error-color);">❌</div>
                        <div class="activity-content">
                            <div class="activity-description">Pedido #12345 cancelado por el cliente</div>
                            <div class="activity-time">Hace 1 día</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.querySelector(".sidebar");
  const userTrigger = document.getElementById("userTrigger");
  const userDropdown = document.getElementById("userDropdown");
  const logoutButton = document.getElementById("logout");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Navigation item selection
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      navItems.forEach((i) => i.classList.remove("active"));
      this.classList.add("active");

      // In a real application, you would load the corresponding module here
      const moduleName = this.querySelector("span").textContent;
      console.log(`Loading module: ${moduleName}`);
    });
  });

  const chartSelect = document.querySelector(".chart-actions select");
  if (chartSelect) {
    chartSelect.addEventListener("change", function () {
      console.log(`Chart period changed to: ${this.value}`);
      // In a real application, you would update the chart data here
    });
  }

  userTrigger.addEventListener("click", function (e) {
    e.stopPropagation();
    userDropdown.classList.toggle("show");
  });

  logoutButton.addEventListener("click", async function () {
    await authService.logout();
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!userTrigger.contains(e.target)) {
      userDropdown.classList.remove("show");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Force hardware acceleration for better performance on WebKit browsers
    const elements = document.querySelectorAll(
      ".sidebar, .main-content, .stat-card, .chart-container, .recent-activity",
    );
    elements.forEach((el) => {
      el.style.webkitTransform = "translateZ(0)";
      el.style.transform = "translateZ(0)";
    });
  });
}
