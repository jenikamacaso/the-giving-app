const { ipcRenderer, contextBridge } = require("electron");

const WINDOW_API = {
  // Send async
  isLoggedIn: () => ipcRenderer.sendSync("isLoggedIn"),
  logout: () => ipcRenderer.sendSync("logout"),
  // getUser: (args) => ipcRenderer.invoke("get/user", args).then((value) => value),
  getUser: () => ipcRenderer.sendSync("get/user"),

  // Invoke
  login: (args) => ipcRenderer.invoke("login", args),
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
