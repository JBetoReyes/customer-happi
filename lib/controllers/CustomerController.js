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
};
