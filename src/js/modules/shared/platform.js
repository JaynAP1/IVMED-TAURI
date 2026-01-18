import { api } from "./api.js";

export const platform = {
  async getInfo() {
    return await api.call("get_system_info");
  },

  async isMac() {
    const info = await this.getInfo();
    return info.data?.platform === "darwin";
  },

  async isWindows() {
    const info = await this.getInfo();
    return info.data?.platform === "windows";
  },

  async isLinux() {
    const info = await this.getInfo();
    return info.data?.platform === "linux";
  },
};
