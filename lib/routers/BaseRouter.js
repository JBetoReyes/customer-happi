const pluralize = require('pluralize');
const upperFirst = require('lodash/upperFirst');

module.exports = class BaseRouter {
    constructor(entityName) {
        this._entityName = entityName;
    }

    _getRouters(otherRouters) {
        const entityName = upperFirst(this._entityName);
        const pluralEntity = pluralize(entityName);
        return [
                `get${pluralEntity}`,      // getCustomers
                `get${entityName}ById`,    // getCustomerById
                `create${entityName}`,     // postCustomer
                `update${entityName}ById`, // updateCustomerById
                `delete${entityName}ById`, // deleteCustomerById
                ...otherRouters
            ].filter((routerName) => {
                return !!this[routerName];
            });
    }

    _getDbModel(request, modelName) {
        const { models } = request.server.plugins.db;
        modelName = modelName || this._entityName;
        return models[modelName];
    }

    getConfigs(otherRouters = []) {
        return this._getRouters(otherRouters).map((routerName) => this[routerName]())
    }
};