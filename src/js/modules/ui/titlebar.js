const { appWindow } = window.__TAURI__.window;

export function initTitlebar() {
  document.getElementById("minimize-btn").addEventListener("click", () => {
    appWindow.minimize();
  });

  document.getElementById("maximize-btn").addEventListener("click", () => {
    appWindow.toggleMaximize();
  });

  document.getElementById("close-btn").addEventListener("click", () => {
    appWindow.close();
  });
}
