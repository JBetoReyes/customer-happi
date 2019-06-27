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
            auth: 'default',
            handler: async (request, h) => {
                const customer = this._getDbModel(request);
                let res = {};
                try {
                    res = await customer.findAll({ raw: true});
                } catch (err) {
                    debug('%O', err);
                }
                return res;
            }
        }
    }

    getCustomerById() {
        return {
            name: 'getCustomerById',
            method: 'GET',
            path: '/customers/{id}',
            description: 'Returns a customer',
            auth: 'default',
            handler: async (request, h) => {
                const { id } = request.params;
                debug('%s', id)
                const customer = this._getDbModel(request);
                let res = {};
                try {
                    res = await customer.findOne({
                        where: {
                            id
                        },
                        raw: true
                    });
                    if (!res) {
                        return h
                            .response({ message: `customer with id: ${id} not found`})
                            .code(404);
                    }
                } catch (err) {
                    debug('%O', err);
                }
                return res;
            }
        }
    }

    createCustomer() {
        return {
            name: 'postCustomer',
            method: 'POST',
            path: '/customers',
            description: 'Creates a new customer in the db',
            auth: 'default',
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