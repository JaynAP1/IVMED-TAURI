export function renderDashboard() {
    const main_content = document.querySelector('.main-content');
    main_content.innerHTML = `
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
    `;

    const chartSelect = document.querySelector(".chart-actions select");
    if (chartSelect) {
        chartSelect.addEventListener("change", function () {
        console.log(`Chart period changed to: ${this.value}`);
        // In a real application, you would update the chart data here
        });
    }
}