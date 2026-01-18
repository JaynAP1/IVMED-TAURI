import { renderLogin } from "./modules/auth/login.js";
import { authService } from "./modules/auth/authService.js";
import { renderHome } from "./modules/home/home.js";

class Router {
  constructor() {
    this.routes = {
      "/": renderLogin,
      "/login": renderLogin,
      "/Home": renderHome,
    };
    this.protectedRoutes = ["/dashboard"]; // Rutas protegidas
    this.currentRoute = "/login";
  }

  navigate(path) {
    // Verificar si la ruta existe
    if (!this.routes[path]) {
      console.error(`Ruta no encontrada: ${path}`);
      path = "Home";
    }

    // Verificar autenticación para rutas protegidas
    if (this.protectedRoutes.includes(path) && !authService.isAuthenticated()) {
      console.log("Acceso denegado. Redirigiendo al login...");
      path = "/login";
    }

    this.currentRoute = path;
    const render = this.routes[path];
    render();
  }

  init() {
    this.navigate(this.currentRoute);
  }
}

export const router = new Router();
window.router = router;
