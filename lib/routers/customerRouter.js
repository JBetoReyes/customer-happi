const BaseRouter = require('./BaseRouter');
const customerController = require('../controllers/CustomerController');
const { customerRoutesValidators: requestValidators } = require('../joi/requests');

class CustomerRouter extends BaseRouter {

    constructor() {
        super('customer');
        this._controller = new customerController(this._entityName);
    }

    postCustomer() {
        return {
            path: '/customers',
            name: 'postCustomer',
            method: 'POST',
            auth: 'default',
            tags: ['api'],
            validate: requestValidators.postCustomer,
            handler: async (request, h) => {
                try {
                    return await this._controller.postCustomer(request, h);
                } catch (e) {
                    h.badRequest(e);
                }
            },
            description: 'Adds a new customer'
        }
    }

    getCustomers() {
        return {
            path: '/customers',
            name: 'getCustomers',
            method: 'GET',
            auth: 'default',
            tags: ['api'],
            validate: requestValidators.getCustomers,
            handler: async (request, h) => {
                try {
                    return await this._controller.getCustomers(request, h);
                } catch (e) {
                    h.badRequest(e);
                }
            },
            description: "Returns a set of customers"
        }
    }

    getCustomerById() {
        return {
            path: '/customers/{id}',
            name: 'getCustomerById',
            method: 'GET',
            auth: 'default',
            tags: ['api'],
            validate: requestValidators.getCustomerById,
            handler: async (request, h) => {
                try {
                    return await this._controller.getCustomerById(request, h);
                } catch (e) {
                    h.badRequest(e);
                }
            },
            description: 'gets a single customer'
        }
    }
}

module.exports = new CustomerRouter();
