const upperFirst = require('lodash/upperFirst');
const uuidv4 = require('uuid/v4');
const pluralize = require('../../utils/string/pluralize');

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
        return model.findAll({
            where: query
        });
    }

    getById() {

    }

    _getHandlers() {
        const entityName = upperFirst(this._entityName);
        const pluralizedEntity = pluralize(entityName);
        const templates = [
            `get${entityName}ById`,
            `get${pluralizedEntity}`,
            `post${entityName}`,
            `update${entityName}ById`,
            `update${pluralizedEntity}`,
            `delete${entityName}`,
            `delete${pluralizedEntity}`
        ];
        return templates.filter(template => !!this[template]);
    }

    getConfigs() {
        return this
            ._getHandlers()            
            .map((handlerName) => this[handlerName]())
    }

}