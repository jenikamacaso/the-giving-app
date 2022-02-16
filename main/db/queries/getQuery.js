const { database } = require("../database");

async function getQuery(query) {
  return new Promise((resolve, reject) => {
    database.get(query, (err, val) => {
      if (err) {
        return reject(err);
      }
      resolve(val);
    });
  });
}

async function getAllQuery(query) {
  return new Promise((resolve, reject) => {
    database.all(query, (err, val) => {
      if (err) {
        return reject(err);
      }
      resolve(val);
    });
  });
}
module.exports = {
  getQuery: getQuery,
  getAllQuery: getAllQuery,
};
