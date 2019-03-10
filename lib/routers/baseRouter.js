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

    getConfigs() {
        return this
            ._getRoutes()            
            .map((handlerName) => this[handlerName]())
    }

}