const express = require("express");
const router = express.Router();

const tweetsService = require("../services/tweetsService");

const statusOK = 200;
const statusCreatedOk = 201;
const statusAcepted = 202;
const statusNotFound = 404;
const statusError = 500;

module.exports = router;

async function getTweets(req, res, next) {
    try {
        throw new Error("This is an error from the tweet router");
        const tweets = await tweetsService.getTweets();
        res.status(statusOK).json(tweets);
    } catch (error) {
        // res.status(statusError).json({ error: error.message });
        next(error);
    }
}

async function getTweet(req, res) {
    try {
        const { tweetId } = req.params;
        const tweet = await tweetsService.getTweet(tweetId);
        if (typeof tweet !== 'undefined') {
            res.status(statusOK).json(tweet);
        } else {
            res.status(statusNotFound).json({ error: 'Tweet not found' });
        }        
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

async function updateTweet(req, res) {
    try {
        const { tweetId } = req.params;
        const { content } = req.body;
        const updatedRows = await tweetsService.updateTweet(tweetId, content);
        if (updatedRows > 0) {
            res.status(statusAcepted).json({ message: "Tweet Updated."});
        } else {
            res.status(statusNotFound).json({ error: 'Tweet not found' });
        }
        
    } catch (error) {
        res.status(statusError).json({ error: error.message });
    }
}

async function deleteTweet(req, res) {
    try {
        const { tweetId } = req.params;
        const deletedRows = await tweetsService.deleteTweet(tweetId);
        if (deletedRows > 0) {
            res.status(statusAcepted).json({ message: "Tweet deleted"});
        } else {
            res.status(statusNotFound).json({ message: 'Tweet not found' });
        }
    } catch (error) {
        res.status(statusError).json({ error: error.message });
    }
}

router.get("/", getTweets);
router.get("/:tweetId", getTweet);
router.post("/", createTweet);
router.patch("/:tweetId", updateTweet);
router.delete("/:tweetId", deleteTweet);
