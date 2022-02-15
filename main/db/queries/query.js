const { database } = require("../database");

getQuery = async (query) => {
  return new Promise((resolve, reject) => {
    database.get(query, (err, val) => {
      if (err) {
        return reject(err);
      }
      resolve(val);
    });
  });
};

query = async (query) => {
  return new Promise((resolve, reject) => {
    console.log(query);
    database.run(query, (err, val) => {
      if (err) {
        return reject(err);
      }
      resolve("Success");
    });
  });
};

module.exports = {
  getQuery: getQuery,
  query: query,
};
