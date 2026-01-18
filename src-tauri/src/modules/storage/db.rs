use serde_json::Value;
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

fn get_app_data_dir(app: &AppHandle) -> Result<PathBuf, String> {
    app.path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))
}

#[tauri::command]
pub fn save_settings(app: AppHandle, settings: Value) -> Result<(), String> {
    let app_dir = get_app_data_dir(&app)?;

    fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;

    let settings_path = app_dir.join("settings.json");
    fs::write(settings_path, settings.to_string()).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
pub fn load_settings(app: AppHandle) -> Result<Value, String> {
    let app_dir = get_app_data_dir(&app)?;
    let settings_path = app_dir.join("settings.json");

    if !settings_path.exists() {
        return Ok(serde_json::json!({}));
    }

    let content = fs::read_to_string(settings_path).map_err(|e| e.to_string())?;

    serde_json::from_str(&content).map_err(|e| e.to_string())
}

pub fn init(app: &AppHandle) -> Result<(), String> {
    let app_dir = get_app_data_dir(app)?;

    fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;

    Ok(())
}
