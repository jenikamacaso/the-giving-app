const sqlite3 = require("sqlite3");

// Initializing a new database
const db = new sqlite3.Database("./main/db/db.sqlite3", (err) => {
  if (err) console.error("Database opening error: ", err);
  console.log("connected to db!");
});

exports.database = db;

module.exports = {
  database: db,
};
