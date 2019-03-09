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
            handler: async (request, h) => {
                const customer = this._getDbModel(request);
                const response = {};
                response.data = await this._service.get(customer, request.query);
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
            handler: async (request, h) => {
                const customer = this._getDbModel(request);
                const payload = request.payload;
                const response = {};
                response.data = await this._service.post(payload, customer);
                return h.json(response);
            },
            description: 'Post a new customer'
        }
    }

}

module.exports = new CustomerRouter();