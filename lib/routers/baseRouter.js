const upperFirst = require('lodash/upperFirst');
const pluralize = require('../../utils/string/pluralize');

module.exports = class BaseRouter {

    constructor(entityName) {
        this._entityName = entityName;
    }
    
    _getRoutes() {
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

    _getDbModel(request, modelName) {
        const { models } = request.server.plugins.db;
        modelName = modelName || this._entityName;
        return models[modelName];
    }

    getConfigs() {
        return this
            ._getRoutes()            
            .map((handlerName) => this[handlerName]())
    }

}