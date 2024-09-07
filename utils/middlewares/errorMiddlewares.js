const config = require("../../config");


function withErrorStack(error, stack) {
    if(config.dev) {
        return { ...error, stack }
    }

    return error;
}

function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    const badImplementationError = {
        stack: err.stack,
        output: {
            statusCode: 500,
            payload: {
                error: 'Internal Server Error',
                message: err.message,
            },
        },
    };

    next(badImplementationError);
}

function errorHnadler(err, req, res, next) {
    const { stack, output } =  err;
    res.status(output.statusCode);
    res.json(withErrorStack(output.payload, err.stack));
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHnadler,
};