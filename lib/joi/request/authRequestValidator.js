const Joi = require('joi');

module.exports = {
    signup: {
        payload: {
            userName: Joi.string(),
            password: Joi.string()
        }
    },
    login: {
        payload: {
            userName: Joi.string(),
            password: Joi.string()
        },
    }
};
