const tweetsRepository = require("../repositories/tweetsRepository");

async function getTweets() {
    return await tweetsRepository.getTweets();
}

async function getTweet(tweetId) {
    return await tweetsRepository.getTweet(tweetId);
}

async function createTweet(tweet) {
    return await tweetsRepository.createTweet(tweet);
}

async function deleteTweet(tweetId) {
    return await tweetsRepository.deleteTweet(tweetId);
}

module.exports = {
    getTweets,
    getTweet,
    createTweet,
    deleteTweet,
};