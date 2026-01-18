import { api } from "../shared/api.js";

export const authService = {
  async login(username, password) {
    try {
      const result = await api.call("login_user", { username, password });

      if (result.success) {
        // Guardar datos del usuario y token
        sessionStorage.setItem("user", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("isAuthenticated", "true");
      }

      return result;
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, error: error.message };
    }
  },

  async logout() {
    try {
      const result = await api.call("logout_user");

      // Limpiar sesión
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("isAuthenticated");

      // Redirigir al login
      window.router.navigate("/login");

      return result;
    } catch (error) {
      console.error("Error en logout:", error);
      return { success: false, error: error.message };
    }
  },

  async getCurrentUser() {
    try {
      return await api.call("get_current_user");
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      return { success: false, error: error.message };
    }
  },

  async verifySession() {
    try {
      const result = await api.call("verify_session");
      return result.success && result.data === true;
    } catch (error) {
      console.error("Error verificando sesión:", error);
      return false;
    }
  },

  async changePassword(oldPassword, newPassword) {
    try {
      return await api.call("change_password", {
        old_password: oldPassword,
        new_password: newPassword,
      });
    } catch (error) {
      console.error("Error cambiando contraseña:", error);
      return { success: false, error: error.message };
    }
  },

  isAuthenticated() {
    return sessionStorage.getItem("isAuthenticated") === "true";
  },

  getStoredUser() {
    const userStr = sessionStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return sessionStorage.getItem("token");
  },
};
