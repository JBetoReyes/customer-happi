const BaseRouter = require('./baseRouter');
const CustomerController = require('../controllers/customerController');
class CustomerRouter extends BaseRouter {

    constructor() {
        super('customer');
        this._controller = new CustomerController(this._entityName);
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
            description: 'Gets a set of customers'
        }
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
            description: 'Post a new customer'
        }
    }

}

module.exports = new CustomerRouter();