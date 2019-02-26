const pluralize = require('../../utils/string/pluralize');
const upperFirst = require('lodash/upperFirst');

module.exports = class EntityService {

    constructor(entityName) {
        this._entityName = entityName;
    }

    get(request, h) {
        return h.json({
            name: 'Jonh'
        })
    }

    _getHandlers() {
        const entityName = upperFirst(this._entityName);
        const pluralizedEntity = pluralize(entityName);
        const templates = [
            `get${entityName}ById`,
            `get${pluralizedEntity}`,
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