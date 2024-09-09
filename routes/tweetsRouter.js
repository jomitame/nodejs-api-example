const express = require("express");
const router = express.Router();
const boom = require('@hapi/boom');

const tweetsService = require("../services/tweetsService");

const validation = require("../utils/middlewares/createValidationMiddleware");
const { createTweetSchema, tweetIdSchema, updateTweetSchema } = require("../utils/schemas/tweetsSchema");

const statusOK = 200;
const statusCreatedOk = 201;
const statusAcepted = 202;
const statusBadRequest = 400;
const statusNotFound = 404;
const statusError = 500;

module.exports = router;

async function getTweets(req, res, next) {
    try {
        //throw new Error("This is an error from the tweet router");
        const tweets = await tweetsService.getTweets();
        res.status(statusOK).json(tweets);
    } catch (error) {
        // res.status(statusError).json({ error: error.message });
        next(error);
    }
}

async function getTweet(req, res, next) {
    try {
        const { tweetId } = req.params;
        const tweet = await tweetsService.getTweet(tweetId);
        if (typeof tweet !== 'undefined') {
            res.status(statusOK).json(tweet);
        } else {
            const { output: { statusCode, payload }} = boom.notFound();
            payload.message = "Tweet not found";
            res.status(statusCode).json(payload);
        }        
    } catch (error) {
        //res.status(statusError).json({ error: error.message });
        next(error);
    }
}

async function createTweet(req, res, next) {
    try {
        const tweet = req.body;
        // const validationError = validate(tweet, createTweetSchema);

        // if(validationError) {
        //     return res
        //     .status(statusBadRequest)
        //     .json({ error: validationError.details[0].message });
        // }

        const result = await tweetsService.createTweet(tweet);
        res.status(statusCreatedOk).json(result);
    } catch (error) {
        //res.status(statusError).json({ error: error.message });
        next(error);    
    }
}

async function updateTweet(req, res, next) {
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
        //res.status(statusError).json({ error: error.message });
        next(error);
    }
}

async function deleteTweet(req, res, next) {
    try {
        const { tweetId } = req.params;
        const deletedRows = await tweetsService.deleteTweet(tweetId);
        if (deletedRows > 0) {
            res.status(statusAcepted).json({ message: "Tweet deleted"});
        } else {
            res.status(statusNotFound).json({ message: 'Tweet not found' });
        }
    } catch (error) {
        //res.status(statusError).json({ error: error.message });
        next(error);
    }
}

router.get("/", getTweets);
router.get("/:tweetId", validation({ params: tweetIdSchema }), getTweet);
router.post("/", validation({ body: createTweetSchema }), createTweet);
router.patch(
    "/:tweetId",
    validation({ params: tweetIdSchema }),
    validation({ body: updateTweetSchema }),
    updateTweet
);
router.delete("/:tweetId", validation({ params: tweetIdSchema }), deleteTweet);
