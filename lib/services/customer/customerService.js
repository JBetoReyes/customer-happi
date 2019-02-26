
const EntityService = require('../entityService');

module.exports = class CustomerService extends EntityService {

    constructor() {
        super('customer');        
    }

    getCustomers() {
        return {
            path: '/customers',
            name: 'getCustomers',
            method: 'GET',
            handler: super.get,
            description: 'Gets a set of customers'
        }
    }
}