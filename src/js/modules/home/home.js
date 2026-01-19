import { authService } from "../auth/authService.js";
import { renderModules } from "../../modules/navbar/navbar.js";

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
            
        </main>
    `;

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebar = document.querySelector(".sidebar");

  // Render navigation modules
  renderModules();

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }


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
