const Joi = require('joi');

module.exports = {
  postCustomers: {
      query: {
          token: Joi.string()
      }
  },
  getCustomners: {
      query: {
          token: Joi.string()
      }
  }

};
