const BaseController = require('./BaseController');

module.exports = class CustomerController extends BaseController {

    constructor(entityName) {
        super(entityName);
    }

    async postCustomer(request, h) {
        const customer = this._getDbModel(request);
        const payload = request.payload;
        const dbRes = await this._queryManager.post(payload, customer);
        return h.json(this._createApiRes(dbRes));
    }

    async getCustomers(request, h) {
        const customer = this._getDbModel(request);
        const dbRes = await this._queryManager.get({}, customer);
        return h.json(this._createApiRes(dbRes));
    }

    async getCustomerById(request, h) {
        const customer = this._getDbModel(request);
        const { id } = request.params;
        const dbRes = await this._queryManager.get({ id }, customer);
        return h.json(this._createApiRes(dbRes));
    }
};
