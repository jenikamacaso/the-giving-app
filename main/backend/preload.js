const { ipcRenderer, contextBridge } = require("electron");

const WINDOW_API = {
  // Sample
  getVersion: () => ipcRenderer.invoke("get/version"),

  isLoggedIn: () => ipcRenderer.sendSync("isLoggedIn"),
  logout: () => ipcRenderer.sendSync("logout"),
  login: (args) => ipcRenderer.invoke("login", args),
  getUser: (args) => ipcRenderer.invoke("get/user", args),
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
