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
            handler: async (request, h) => {
                return h.json({
                    "data": [
                        {
                            "id": "fedb2fa3-8f5c-5189-80e6-f563dd1cb8f9",
                            "name": 'jon',
                            "lastName": "doe",
                            "address": "some address",
                            "phone": "123-123-1234"
                        }
                    ]
                });
            },
            description: "Returns a set of customers"
        }
    }

    getCustomerById() {
        return {
            path: '/customers/{id}',
            name: 'getCustomerById',
            method: 'GET',
            handler: async (request, h) => {
                const { id } = request.params;
                return h.json({
                    "data": {
                        id,
                        "name": 'jon',
                        "lastName": "doe",
                        "address": "some address",
                        "phone": "123-123-1234"
                    }
                });
            },
            description: 'gets a single customer'
        }
    }
}

module.exports = new CustomerRouter();
