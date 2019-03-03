
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

    postCustomer() {
        return {
            path: '/customers',
            name: 'postCustomer',
            method: 'POST',
            handler: super.post.bind(this),
            description: 'Post a new customer'
        }
    }
}