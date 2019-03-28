const uuidV4 = require('uuid/v4');

module.exports = class BaseQueryManager {

    async post(payload, model) {
        return await model.create({
            ...payload,
            id: uuidV4()
        });
    }

    async get(filters, model) {
        return await model.findAll({ where: filters });
    }
};
