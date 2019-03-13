const BaseController = require('./baseController');

module.exports = class CustomerController extends BaseController {

    async getCustomers(request, h) {
        const customer = this._getDbModel(request);
        const response = {};
        response.data = await this._service.get(customer, request.query);
        return h.json(response);
    }

    async postCustomer(request, h) {
        const customer = this._getDbModel(request);
        const payload = request.payload;
        const response = {};
        response.data = await this._service.post(payload, customer);
        return h.json(response);
    }
};