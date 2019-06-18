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
                const customer = this._getDbModel(request);
                return customer.findAll({ raw: true});
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