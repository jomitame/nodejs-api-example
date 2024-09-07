const tweetsRepository = require("../repositories/tweetsRepository");

async function getTweets() {
    return await tweetsRepository.getTweets();
}

module.exports = {
    getTweets,
};