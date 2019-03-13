const uuidv4 = require('uuid/v4');

module.exports = class EntityService {

    constructor(entityName) {
        this._entityName = entityName;
    }

    async post(payload, model) {
        return await model.create({
            ...payload,
            id: uuidv4()
        });
    }

    async get(model, query) {
        query = Object.keys(query)
            .reduce((acc, key) => {
                if (key === 'token') return acc;
                return Object.assign(acc, key);
            }, {});
        return await model.findAll({
            where: query
        });
    }
    
    async getBy(model, query) {
        const instance = await model.find({
            where: query
        });

        if (!instance) return '';
        return instance.get({ plain: true })
    }

    getById() {

    }

};