const { database } = require("./db/database");


async function getQuery(query) {
    return new Promise((resolve, reject) => {
        database.get(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}
exports.getQuery = getQuery;
