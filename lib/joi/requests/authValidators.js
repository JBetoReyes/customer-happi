const Joi = require('joi');

const commonValidator = {
    payload: {
        userName: Joi.string(),
        password: Joi.string()
    },
    failAction: (request, h, err) => {
        throw err;
    }
};

module.exports = {
    login: commonValidator,
    signup: commonValidator
};
