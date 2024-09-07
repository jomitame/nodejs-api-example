const connection = require("../lib/connect");

async function getTweets() {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM tweets";
        connection.query(sqlQuery, (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function createTweet(tweet) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "INSERT INTO tweets SET ?";
        connection.query(sqlQuery, tweet, (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve({ tweetId: results.insertId, ...tweet });
            }
        });
    });
}

module.exports = {
    getTweets,
    createTweet,
};