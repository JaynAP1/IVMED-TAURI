use super::models::{LoginRequest, LoginResponse, User};
use crate::modules::storage::db;
use bcrypt::{hash, verify, DEFAULT_COST};
use std::sync::Mutex;
use std::collections::HashMap;
use tauri::{AppHandle, Manager, State}; // Importamos el acceso, NO el init
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
pub fn get_modules_by_role(role: &str) -> Vec<String> {
    if role.is_empty() {
        return vec![];
    }

    db::fetch_all(
        "SELECT name FROM modules WHERE role = ?1",
        &[&role],
        |row| {
            let module_name: String = row.get(0)?;
            Ok(module_name)
        },
    )
    .unwrap_or_default()
}

#[tauri::command]
pub fn login_user(
    username: String,
    password: String,
    state: State<AuthState>,
) -> Result<LoginResponse, String> {
    // Validate params
    if username.is_empty() || password.is_empty() {
        return Err("Usuario y contraseña son requeridos".to_string());
    }

    let user_data = db::fetch_one(
        "SELECT id, username, role, password, name, lastname FROM User WHERE username = ?1",
        &[&username],
        |row| {
            let id: i32 = row.get(0)?;
            let username: String = row.get(1)?;
            let role: String = row.get(2)?;
            let stored_hash: String = row.get(3)?;
            let name: String = row.get(4)?;
            let lastname: String = row.get(5)?;
            Ok((role, stored_hash, name, lastname))
        },
    )
    .map_err(|e| e.to_string())?;

    match user_data {
        Some((role, stored_hash, name, lastname)) => {
            let is_valid = verify(&password, &stored_hash).unwrap_or(false);

            if is_valid {
                let user = User {
                    name: format!("{} {}", name, lastname),
                    role: role,
                };
                let token = generate_simple_token(&name);

                println!("Login exitoso para: {}", name);
                Ok(LoginResponse { user, token })
            } else {
                println!("Password incorrecto para: {}", name);
                Err("Usuario o contraseña incorrectos".to_string())
            }
        }
        None => {
            println!("Usuario no encontrado: {}", username);
            Err("Usuario o contraseña incorrectos".to_string())
        }
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

#[tauri::command]
pub fn register_user(username: String, password: String) -> Result<(), String> {
    let hashed_pass = hash(&password, DEFAULT_COST).map_err(|e| e.to_string())?;

    db::execute(
        "INSERT INTO User (username, password, role) VALUES (?1, ?2, 'admin')",
        &[&username, &hashed_pass],
    )
    .map_err(|e| e.to_string())?;

    Ok(())
}
