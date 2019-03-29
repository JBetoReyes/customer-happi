const BaseRouter = require('./BaseRouter');
const customerController = require('../controllers/CustomerController');

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
            handler: async (request, h) => {
                return await this._controller.postCustomer(request, h);
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
            handler: async (request, h) => {
                return await this._controller.getCustomers(request, h);
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
            handler: async (request, h) => {
                return await this._controller.getCustomerById(request, h);
            },
            description: 'gets a single customer'
        }
    }
}

module.exports = new CustomerRouter();
