// Native
const { join } = require("path");
const { format } = require("url");

// Packages
const { BrowserWindow, app, ipcMain } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const prepareNext = require("electron-next");

// Database
const sqlite3 = require("sqlite3");

const database = new sqlite3.Database("./main/db/db.sqlite3", (err) => {
  if (err) console.error("Database opening error: ", err);
  console.log("connected to db!");
});

async function db_all(args) {
  return new Promise(function (resolve, reject) {
    database.get(
      `SELECT * FROM Users WHERE Username = ? AND Password = ?`,
      [args.username, args.password],
      (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
  });
}

ipcMain.handle("get/user", async (event, args) => {
  return db_all(args)
});

ipcMain.handle("get/version", async (event, args) => {
  await setTimeout(() => {
    console.log(app.getVersion());
  }, 3000);
  return app.getVersion();
});

let mainWindow;

// Initializing the Electron Window
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1400,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, "/backend/preload.js"),
      worldSafeExecuteJavaScript: true, // If you're using Electron 12+, this should be enabled by default and does not need to be added here.
      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
    },
  });

  const url = isDev
    ? "http://localhost:3000"
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
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
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
process.on("uncaughtException", (error) => {
  console.log(`Exception: ${error}`);
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on("message", (event, message) => {
  event.sender.send("message", message);
});
