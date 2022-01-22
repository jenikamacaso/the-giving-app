const { ipcRenderer, contextBridge } = require("electron");

const WINDOW_API = {
  // Sample
  getVersion: () => ipcRenderer.invoke("get/version"),

  getUser: (args) => ipcRenderer.invoke("get/user", args),
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
