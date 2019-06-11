const BaseRouter = require('./BaseRouter');
const debug = require('debug')('app:customerRouter');
const uuidV4 = require('uuid/v4');

module.exports = class CustomerRouter extends BaseRouter {
    constructor() {
        super('customer');
    }

    getCustomers() {
        return {
            name: 'getCustomers',
            method: 'GET',
            path: '/customers',
            description: 'Returns a list of customers',
            handler: (request, h) => {
                return {
                    "data": [
                        {
                            "id": "3880f788-4c03-4fd6-889f-95c09983710a",
                            "firstName": "jon",
                            "lastName": "doe",
                            "phone": "132-123-1134",
                            "email": "myEmail@email.com"
                        },
                        {
                            "id": "3a8fbfc8-525a-49d9-9286-a8e4caf4f4a7",
                            "firstName": "jon",
                            "lastName": "doe",
                            "phone": "132-123-1134",
                            "email": "myEmail@email.com"
                        },
                        {
                            "id": "c07de8fb-c873-421f-a383-5fb4f6bae479",
                            "firstName": "Jesus",
                            "lastName": "Juan",
                            "phone": "132-123-1134",
                            "email": "myEmail@email.com"
                        }
                    ]
                }
            }
        }
    }

    getCustomerById() {
        return {
            name: 'getCustomerById',
            method: 'GET',
            path: '/customers/{id}',
            description: 'Returns a customer',
            handler: (request, h) => {
                debug('%O',request.params.id)
                return {
                    "data":
                    {
                        "id": "3880f788-4c03-4fd6-889f-95c09983710a",
                        "firstName": "jon",
                        "lastName": "doe",
                        "phone": "132-123-1134",
                        "email": "myEmail@email.com"
                    }
                }
            }
        }
    }

    createCustomer() {
        return {
            name: 'postCustomer',
            method: 'POST',
            path: '/customers',
            description: 'Creates a new customer in the db',
            handler: async (request, h) => {
                const customer = this._getDbModel(request);
                const payload = request.payload;
                let dbRes;
                try {
                    dbRes = await customer.create({
                        ...payload,
                        id: uuidV4()
                    });
                } catch (err) {
                    debug('%O', err);
                }
                return {
                    data: dbRes
                };
            }
        }
    }
}