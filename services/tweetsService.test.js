const tweetService = require("./tweetsService");
const tweetsRepository = require("../repositories/tweetsRepository");

jest.mock(
    "../repositories/tweetsRepository", () => ({
        getTweets: jest.fn(() => ["tweet1", "tweet1"]),
    }));

describe("[ services / tweetService ]", () => {
    describe("#getTweets", () => {
        it("should get all tweets", async () => {
            // Arrange
            const expected = ["tweet1", "tweet1"];

            // Act
            const result = await tweetService.getTweets();
    
            // Assert
            expect(result).toEqual(expected);

            // Another Assert (not recommended, instead make other it)
            expect(tweetsRepository.getTweets).toHaveBeenCalledTimes(1);
        });
    });
});