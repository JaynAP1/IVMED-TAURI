import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Aplicación iniciando...");

  // Inicializar router - esto cargará automáticamente el login
  router.init();

  console.log("Aplicación iniciada en:", router.currentRoute);
});
