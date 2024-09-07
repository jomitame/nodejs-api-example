const connection = require("../lib/connect");

async function getTweets() {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM tweets";
        connection.query(sqlQuery, (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results)
            }
        });
    });
}

module.exports = {
    getTweets,
};