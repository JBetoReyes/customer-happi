const Joi = require('joi');

module.exports = {
  postCustomers: {
      query: {
          token: Joi.string()
      }
  }
};
