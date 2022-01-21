const sqlite3 = require("sqlite3");

// Initializing a new database
const db = new sqlite3.Database(
  isDev
    ? path.join("./public/db.sqlite3") // my root folder if in dev mode
    : path.join(process.resourcesPath, "db/prefs.db"), // the resources path if in production build
  (err) => {
    if (err) {
      console.log(`Database Error: ${err}`);
    } else {
      console.log("Database Loaded");
    }
  }
);
