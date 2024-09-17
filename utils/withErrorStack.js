const config = require("../config");

function withErrorStack(error, stack, _isStasckShown = config.dev) {
    if(_isStasckShown) {
        return { ...error, stack }
    }

    return error;
}

module.exports = withErrorStack;