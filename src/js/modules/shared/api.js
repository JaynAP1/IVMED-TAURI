// Wrapper para las llamadas a Tauri
const { invoke } = window.__TAURI__.core;

export const api = {
  async call(command, args = {}) {
    try {
      const result = await invoke(command, args);
      return { success: true, data: result };
    } catch (error) {
      console.error(`Error calling ${command}:`, error);
      return { success: false, error };
    }
  },
};
