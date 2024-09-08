const validate = require("../validate");


// @params {Object} validationSchema - { [K in "body" | "query" | "params" ]: joiSchema }
function createValidationMiddleware(validationSchema) {
    const [[ payloadKey, joiSchema ]] = Object.entries(validationSchema);
    
    if (
        payloadKey !== "body" &&
        payloadKey !== "query" &&
        payloadKey !== "params"
    ) {
        throw new Error("Invalid payload ket must to be one of 'body, 'query' or 'params'");
    }

    return function validationMiddleware(req, res, next) {
        const error = validate(req[payloadKey], joiSchema);
        error ? next(error) : next();
    };
}

module.exports = createValidationMiddleware;