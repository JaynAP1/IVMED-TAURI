const { register } = window.__TAURI__.globalShortcut;

export async function registerShortcuts() {
  // Ctrl+S para guardar
  await register("CommandOrControl+S", () => {
    window.dispatchEvent(new CustomEvent("app:save"));
  });

  // Ctrl+N para nuevo
  await register("CommandOrControl+N", () => {
    window.dispatchEvent(new CustomEvent("app:new"));
  });

  // Ctrl+Q para salir
  await register("CommandOrControl+Q", () => {
    window.dispatchEvent(new CustomEvent("app:quit"));
  });
}
