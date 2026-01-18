use super::models::{LoginRequest, LoginResponse, User};
use sqlx::{sqlite::SqlitePoolOptions, Pool, Sqlite};
use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};

// Estado global para almacenar la sesión actual
pub struct AuthState {
    pub current_user: Mutex<Option<User>>,
}

impl AuthState {
    pub fn new() -> Self {
        Self {
            current_user: Mutex::new(None),
        }
    }
}

#[tauri::command]
pub fn login_user(
    username: String,
    password: String,
    state: State<AuthState>,
) -> Result<LoginResponse, String> {
    // Validar que los campos no estén vacíos
    if username.is_empty() || password.is_empty() {
        return Err("Usuario y contraseña son requeridos".to_string());
    }

    // TODO: Aquí deberías validar contra una base de datos
    // Por ahora, validación simple de ejemplo
    if username == "admin" && password == "admin123" {
        let user = User {
            id: "1".to_string(),
            username: username.clone(),
            email: format!("{}@ivmed.com", username),
            role: "admin".to_string(),
        };

        // Guardar usuario en el estado
        let mut current_user = state.current_user.lock().unwrap();
        *current_user = Some(user.clone());

        // Generar token simple (en producción usa JWT)
        let token = generate_simple_token(&username);

        Ok(LoginResponse { user, token })
    } else if username == "a@gmail.com" && password == "doc123" {
        let user = User {
            id: "2".to_string(),
            username: username.clone(),
            email: format!("{}@ivmed.com", username),
            role: "doctor".to_string(),
        };

        let mut current_user = state.current_user.lock().unwrap();
        *current_user = Some(user.clone());

        let token = generate_simple_token(&username);

        Ok(LoginResponse { user, token })
    } else {
        Err("Usuario o contraseña incorrectos".to_string())
    }
}

#[tauri::command]
pub fn logout_user(state: State<AuthState>) -> Result<bool, String> {
    let mut current_user = state.current_user.lock().unwrap();
    *current_user = None;
    Ok(true)
}

#[tauri::command]
pub fn get_current_user(state: State<AuthState>) -> Result<Option<User>, String> {
    let current_user = state.current_user.lock().unwrap();
    Ok(current_user.clone())
}

#[tauri::command]
pub fn verify_session(state: State<AuthState>) -> Result<bool, String> {
    let current_user = state.current_user.lock().unwrap();
    Ok(current_user.is_some())
}

#[tauri::command]
pub fn change_password(
    old_password: String,
    new_password: String,
    state: State<AuthState>,
) -> Result<bool, String> {
    // Verificar que hay un usuario logueado
    let current_user = state.current_user.lock().unwrap();

    if current_user.is_none() {
        return Err("No hay sesión activa".to_string());
    }

    // Validar nueva contraseña
    if new_password.len() < 6 {
        return Err("La contraseña debe tener al menos 6 caracteres".to_string());
    }

    // TODO: Validar old_password y actualizar en base de datos
    // Por ahora solo simulamos el éxito

    Ok(true)
}

// Función auxiliar para generar un token simple
fn generate_simple_token(username: &str) -> String {
    use std::time::{SystemTime, UNIX_EPOCH};

    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();

    format!("{}_{}", username, timestamp)
}
