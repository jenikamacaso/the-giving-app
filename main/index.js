// Native
const { join } = require("path");
const { format } = require("url");

// Packages
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const prepareNext = require("electron-next");

// Persist Store
const { login, logout, isLoggedIn } = require("./backend/store");

// Queries
const { getQuery } = require("./db/queries/getQuery");

ipcMain.on("isLoggedIn", async (event, args) => {
  const isLog = await isLoggedIn();
  event.returnValue = isLog;
});

ipcMain.on("logout", (event, args) => {
  event.returnValue = logout();
});

ipcMain.handle("login", async (event, args) => {
  const q = `SELECT * FROM Users WHERE Username = '${args.username}' AND Password = '${args.password}'`;
  const data = await getQuery(q);
  return await login(data);
});

ipcMain.handle("get/user", async (event, args) => {
  const q = `SELECT * FROM Users WHERE Username = '${args.username}' AND Password = '${args.password}'`;
  const data = await getQuery(q);
  return await data;
});

let mainWindow;

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    minWidth: 1500,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "/backend/preload.js"),
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
    },
  });

  const url = isDev
    ? "http://localhost:3002"
    : format({
        pathname: join(__dirname, "./renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);

  // Setting Window Icon - Asset file needs to be in the public/images folder.
  mainWindow.setIcon(
    path.join(__dirname, "/renderer/assets/images/appicon.ico")
  );

  // In development mode, if the window has loaded, then load the dev tools.
  if (isDev) {
    mainWindow.webContents.on("did-frame-finish-load", () => {
      mainWindow.webContents.openDevTools({ mode: "detach" });
    });
  }
};

// ((OPTIONAL)) Setting the location for the userdata folder created by an Electron app. It default to the AppData folder if you don't set it.
app.setPath(
  "userData",
  isDev
    ? path.join(app.getAppPath(), "main/userdata/") // In development it creates the userdata folder where package.json is
    : path.join(process.resourcesPath, "main/userdata/") // In production it creates userdata folder in the resources folder
);

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  await prepareNext("./renderer");
  createWindow();
});

// Quit the app once all windows are closed
app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    await logout();
    app.quit();
  }
});

// Activating the app
// app.on('activate', () => {
//     if (mainWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

// Logging any exceptions
process.on("uncaughtException", async (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== "darwin") {
    await logout();
    app.quit();
  }
});

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event, message) => {
  event.sender.send("message", message);
});
