const pluralize = require('../../utils/string/pluralize');
const upperFirst = require('lodash/upperFirst');
const uuidv4 = require('uuid/v4');

module.exports = class EntityService {

    constructor(entityName) {
        this._entityName = entityName;
    }

    async post(request, h) {
        const { models } = request.server.plugins.db;
        const dbEntity = models[this._entityName];
        const response = await dbEntity.create({
            ...request.payload,
            id: uuidv4()
        });
        return h.json(response)
    }

    get(request, h) {
        return h.json({
            name: 'Jonh'
        })
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