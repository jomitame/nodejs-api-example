const boom = require("@hapi/boom");
const withErrorStack =  require('../withErrorStack');


function logErrors(err, req, res, next) {
    console.log(err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if(!err.isBoom) {
        next(boom.badImplementation(err));
    }

    next(err);
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