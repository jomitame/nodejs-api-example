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

async function getTweet(tweetId) {
    return new Promise((resolve, reject) => {
        const sqlQuery = "SELECT * FROM tweets WHERE tweetId = ?";
        connection.query(sqlQuery, tweetId, (error, results) => {
            if (error){
                reject(error);
            } else {
                resolve(results[0]);
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
    getTweet,
    createTweet,
};