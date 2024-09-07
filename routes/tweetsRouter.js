const express = require("express");
const router = express.Router();

const tweetsService = require("../services/tweetsService");

const statusOK = 200;
const statusCreatedOk = 201;
const statusError = 500;

module.exports = router;

async function getTweets(req, res) {
    try {
        const tweets = await tweetsService.getTweets();
        res.status(statusOK).json(tweets);
    } catch (error) {
        res.status(statusError).json({ error: error.message });
    }
}

async function createTweet(req, res) {
    try {
        const tweet = req.body;
        const result = await tweetsService.createTweet(tweet);
        res.status(statusCreatedOk).json(result);
    } catch (error) {
        res.status(statusError).json({ error: error.message });    
    }
}

router.get("/", getTweets);
router.post("/", createTweet);
