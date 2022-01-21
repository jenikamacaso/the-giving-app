const { ipcRenderer, contextBridge } = require("electron");

// contextBridge.exposeInMainWorld('electron', {
//   message: {
//     send: (payload) => ipcRenderer.send('message', payload),
//     on: (handler) => ipcRenderer.on('message', handler),
//     off: (handler) => ipcRenderer.off('message', handler),
//   },
// })

contextBridge.exposeInMainWorld("api", {
  // // Invoke Methods
  // testInvoke: (args) => ipcRenderer.invoke('test-invoke', args),
  // // Send Methods
  // testSend: (args) => ipcRenderer.send('test-send', args),
  // // Receive Methods
  // testReceive: (callback) => ipcRenderer.on('test-receive', (event, data) => { callback(data) }),

  getProfileInfo: (args) =>
    ipcRenderer.invoke("get-profile-details", args).then((value) => {
      console.log("apiKey.invokeApi:", value);
      return value;
    }),
});
