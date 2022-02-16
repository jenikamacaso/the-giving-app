const { ipcRenderer, contextBridge } = require("electron");

const WINDOW_API = {
  // Send async
  isLoggedIn: () => ipcRenderer.sendSync("isLoggedIn"),
  getUser: () => ipcRenderer.sendSync("get/user"),
  logout: (args) => ipcRenderer.sendSync("logout"),
  // getUser: (args) => ipcRenderer.invoke("get/user", args).then((value) => value),

  // Invoke
  login: (args) => ipcRenderer.invoke("login", args),
  createUser: (args) => ipcRenderer.invoke("create/user", args),

  // Members
  viewMembers: (args) => ipcRenderer.invoke("view/members", args),
  viewMember: (args) => ipcRenderer.invoke("view/member", args),
  createMember: (args) => ipcRenderer.invoke("create/member", args),
  updateMember: (args) => ipcRenderer.invoke("update/member", args),
  deleteMember: (args) => ipcRenderer.invoke("delete/member", args),
};

contextBridge.exposeInMainWorld("api", WINDOW_API);
