const Joi = require('joi');

const commonValidator = {
    query: {
        token: Joi.string()
    },
    failAction: (request, h, err) => {
        throw err;
    }
};

module.exports = {
    postCustomer: Object.assign({}, commonValidator, {
        payload: {
            firstName: Joi.string().max(40),
            lastName: Joi.string().max(40),
            address: Joi.string(),
            phone: Joi.string().regex(/(\d{3}-){2}\d{4}/, { name: 'phone' }),
            email: Joi.string().email()
        }
    }),
    getCustomers: commonValidator,
    getCustomerById: commonValidator
};
