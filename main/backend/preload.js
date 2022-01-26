const { ipcRenderer, contextBridge } = require("electron");

const WINDOW_API = {
  // Send async
  isLoggedIn: () => ipcRenderer.sendSync("isLoggedIn"),
  getUser: () => ipcRenderer.sendSync("get/user"),
  // getUser: (args) => ipcRenderer.invoke("get/user", args).then((value) => value),

  // Invoke
  login: (args) => ipcRenderer.invoke("login", args),
  logout: (args) => ipcRenderer.invoke("login", args),
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
