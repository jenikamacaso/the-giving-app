const { database } = require("../database");

postQuery = async (query) => {
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
  postQuery: postQuery,
};
