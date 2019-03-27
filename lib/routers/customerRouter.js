const BaseRouter = require('./baseRouter');

class CustomerRouter extends BaseRouter {

    constructor() {
        super('customer');
    }

    getCustomers() {
        return {
            path: '/cutomers',
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
