const ServiceEntity = require('../services/entityService');

module.exports = class BaseController {

    constructor(entityName) {
        this._entityName = entityName;
        this._service = new ServiceEntity(this._entityName); 
    }

    _getDbModel(request, modelName) {
        const { models } = request.server.plugins.db;
        modelName = modelName || this._entityName;
        return models[modelName];
    }

}