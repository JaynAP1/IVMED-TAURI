#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod modules;
use modules::storage::db;

use modules::auth::AuthState;
use tauri::Manager;

fn main() {
    if let Err(e) = db::init("dev.db") {
        eprintln!("Error fatal: No se pudo conectar a la BD: {}", e);
        return;
    }

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AuthState::new()) // Inicializar estado de autenticación
        .invoke_handler(tauri::generate_handler![
            // Window commands
            modules::window::manager::minimize_window,
            modules::window::manager::maximize_window,
            modules::window::manager::close_window,
            // Auth commands
            modules::auth::handlers::login_user,
            modules::auth::handlers::logout_user,
            modules::auth::handlers::get_current_user,
            modules::auth::handlers::verify_session,
            modules::auth::handlers::get_modules_by_role,
            modules::auth::handlers::change_password,
            modules::auth::handlers::register_user,
            // Filesystem commands
            modules::filesystem::file_ops::read_file,
            modules::filesystem::file_ops::write_file,
            // System commands
            modules::system::info::get_system_info,
            modules::system::info::get_app_data_path,
        ])
        .setup(|app| {
            // Inicializar storage
            #[cfg(debug_assertions)]
            {
                if let Some(window) = app.get_webview_window("main") {
                    window.open_devtools();
                }
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
