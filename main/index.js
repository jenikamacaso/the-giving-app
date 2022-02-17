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
const { getQuery, getAllQuery } = require("./db/queries/getQuery");
const { postQuery } = require("./db/queries/postQuery");
const { query } = require("./db/queries/query");

ipcMain.on("isLoggedIn", async (event, args) => {
  console.log("calling isLoggedIn");
  const isLog = await isLoggedIn();
  console.log(app.getAppPath());
  event.returnValue = isLog;
});

ipcMain.on("get/user", async (event, args) => {
  const user = await getUser();
  event.returnValue = user;
});

ipcMain.on("logout", async () => {
  return await logout(data);
});

// Invoke
ipcMain.handle("login", async (event, args) => {
  const q = `SELECT * FROM Users WHERE Username = '${args.username}' AND Password = '${args.password}'`;
  const data = await getQuery(q);
  return await login(data);
});

ipcMain.handle("create/user", async (event, args) => {
  const q = `INSERT INTO Users (Username, Password, Name) VALUES (${args})`;
  return await postQuery(q);
});

// Members
ipcMain.handle("view/members", async (event, args) => {
  const q = `SELECT * FROM Members`;
  return await getAllQuery(q);
});

ipcMain.handle("view/member", async (event, args) => {
  const q = `SELECT * FROM Members WHERE Id = '${args.Id}'`;
  return await getQuery(q);
});

ipcMain.handle("create/member", async (event, args) => {
  console.log("POSTING...");
  const q = `INSERT INTO Members (Name, Email, Address, Phone, DateOfBirth, Status, IsDeleted) VALUES 
  ('${args.Name}', '${args.Email}', '${args.Address}', '${args.Phone}', '${args.DateOfBirth}', '${args.Age}', '${args.Gender}', '${args.Status}', '${args.IsDeleted}' )`;
  return await query(q);
});

ipcMain.handle("update/member", async (event, args) => {
  console.log("UPDATING...");
  const q = `Update Members SET Name="${args.Name}, Email="${args.Email}, Address="${args.Address}, Phone="${args.Phone}, DateOfBirth="${args.DateOfBirth},  Age="${args.Age},  Gender="${args.Gender}, Status="${args.Status}, IsDeleted="${args.IsDeleted}" 
  WHERE Id="args.Id"`;
  return await query(q);
});

ipcMain.handle("delete/member", async (event, args) => {
  console.log("DELETING...");
  const q = `DELETE FROM Members WHERE Id = ${args.Id}`;
  return await query(q);
});

// ipcMain.handle("get/user", async (event, args) => {
//   const q = `SELECT * FROM Users WHERE Username = '${args.username}' AND Password = '${args.password}'`;
//   const data = await getQuery(q);
//   return await data;
// });

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
      preload: isDev
        ? path.join(__dirname, "/backend/preload.js") // Loading it from the public folder for dev
        : path.join(app.getAppPath(), "./main/backend/preload.js"), // Loading it from the build folder for production

      contextIsolation: true, // Isolating context so our app is not exposed to random javascript executions making it safer.
      enableRemoteModule: true,
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : format({
        pathname: join(__dirname, "../renderer/out/index.html"),
        protocol: "file:",
        slashes: true,
      });

  mainWindow.loadURL(url);

  // Setting Window Icon - Asset file needs to be in the public/images folder.
  // mainWindow.setIcon(
  //   path.join(__dirname, "/renderer/assets/images/appicon.ico")
  // );

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
