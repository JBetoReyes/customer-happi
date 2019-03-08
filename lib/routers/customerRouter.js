const BaseRouter = require('./baseRouter');
const EntityService = require('../services/entityService');

class CustomerRouter extends BaseRouter {

    constructor() {
        super('customer');
        this._service = new EntityService(this._entityName);
    }

    getCustomers() {
        return {
            path: '/customers',
            name: 'getCustomers',
            method: 'GET',
            handler: (request, h) => {
                const user = this._getDbModel(request);
                const response = this._service.get(user, request.query);
                return h.json(response);
            },
            description: 'Gets a set of customers'
        }
    }

    postCustomer() {
        return {
            path: '/customers',
            name: 'postCustomer',
            method: 'POST',
            handler: (request, h) => {
                const user = this._getDbModel(request);
                const response = this._service.post(user);
                return h.json(response);
            },
            description: 'Post a new customer'
        }
    }

}

module.exports = new CustomerRouter();