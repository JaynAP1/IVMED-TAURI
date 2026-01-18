import { authService } from "./authService.js";

export function renderLogin() {
  document.getElementById("login").disabled = false;
  const content = document.getElementById("content");
  content.innerHTML = `
    <div class="login-container">
        <div class="logo-container">
            <div class="logo">
                <svg viewBox="0 0 24 24">
                    <path
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H7v-4h4v4zm0-6H7V7h4v4zm6 6h-4v-4h4v4zm0-6h-4V7h4v4z"
                    />
                </svg>
            </div>
            <div class="logo-text">Farma<span>Shop</span></div>
        </div>

        <h1 class="form-title">Bienvenido de nuevo</h1>
        <p class="form-subtitle">Inicia sesión para acceder a tu cuenta</p>

        <div class="success-message" id="successMessage">
            ¡Inicio de sesión exitoso! Redirigiendo...
        </div>

        <form id="loginForm">
            <div class="input-group">
                <label for="user" class="input-label"
                    >Nombre de usuario</label
                >
                <input
                    type="text"
                    id="user"
                    class="input-field"
                    placeholder="usuario1"
                    required
                />
            </div>

            <div class="input-group">
                <label for="password" class="input-label">Contraseña</label>
                <input
                    type="password"
                    id="password"
                    class="input-field"
                    placeholder="••••••••"
                    required
                />
                <div class="error-message" id="passwordError">
                    La contraseña debe tener al menos 6 caracteres
                </div>
            </div>

            <div class="remember-forgot">
                <a href="#" class="forgot-password"
                    >¿Olvidaste tu contraseña?</a
                >
            </div>

            <button type="submit" class="login-button">
                Iniciar Sesión
            </button>
        </form>
    </div>
    `;

  const passwordToggle = document.getElementById("passwordToggle");
  const passwordField = document.getElementById("password");

  // Form validation and submission
  const loginForm = document.getElementById("loginForm");
  const userField = document.getElementById("user");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6;
  }

  function showErrorMessage(element, messageElement) {
    element.classList.add("error");
    messageElement.style.display = "block";
  }

  function hideErrorMessage(element, messageElement) {
    element.classList.remove("error");
    messageElement.style.display = "none";
  }

  passwordField.addEventListener("blur", function () {
    if (!validatePassword(this.value)) {
      showErrorMessage(this, passwordError);
    } else {
      hideErrorMessage(this, passwordError);
    }
  });

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    hideErrorMessage(passwordField, passwordError);

    let isValid = true;

    if (!validatePassword(passwordField.value)) {
      showErrorMessage(passwordField, passwordError);
      isValid = false;
    }

    if (isValid) {
      try {
        const loginResult = await authService.login(
          userField.value,
          passwordField.value,
        );

        if (loginResult.success) {
          console.log("Acceso concedido");
          window.router.navigate("/Home");
        } else {
          errorMsg.innerText = "Usuario o contraseña incorrectos";
        }
      } catch (err) {
        console.error("Error en la DB:", err);
        errorMsg.innerText = "Error técnico al conectar con la base de datos";
      }
    }
  });

  document
    .querySelector(".forgot-password")
    .addEventListener("click", function (e) {
      e.preventDefault();
      alert(
        "Funcionalidad de recuperación de contraseña no implementada en esta demo.",
      );
    });
}
