const upperFirst = require('lodash/upperFirst');

module.exports = class BaseRouter {

    constructor(entityName) {
        this._entityName = entityName;
    }

    _getRoutes() {
        const entityName = upperFirst(this._entityName); // ie. Customer
        const pluralizedEntity = `${ entityName }s`; // ie. Customers
        const templates = [
            `get${ entityName }ById`, // ie. getCustomerById
            `get${ pluralizedEntity }`, // ie. getCustomers
            `post${ entityName }`, // ie. postCustomer
            `update${ entityName }ById`, // ie. updateCustomerById
            `update${ pluralizedEntity }`, // ie. updateCustomers
            `delete${ entityName }ById`, // ie. deleteCustomerById
            `delete${ pluralizedEntity }` // ie. deleteCustomers
        ];
        return templates.filter(template => !!this[template]);
    }

    getConfigs() {
        return this._getRoutes().map((handlerName) => this[handlerName]())
    }
};
