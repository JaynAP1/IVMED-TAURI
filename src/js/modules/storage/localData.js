import { api } from "../shared/api.js";

export const localData = {
  async saveSettings(settings) {
    return await api.call("save_settings", { settings });
  },

  async loadSettings() {
    return await api.call("load_settings");
  },

  async getAppDataPath() {
    return await api.call("get_app_data_path");
  },
};
