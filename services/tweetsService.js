const tweetsRepository = require("../repositories/tweetsRepository");

async function getTweets() {
    return await tweetsRepository.getTweets();
}

async function createTweet(tweet) {
    return await tweetsRepository.createTweet(tweet);
}

module.exports = {
    getTweets,
    createTweet,
};