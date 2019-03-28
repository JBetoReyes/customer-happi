const baseQueryManager = require('../queryManagers/baseQueryManager');

module.exports = class BaseController {
    constructor(entityName) {
        this._entityName = entityName;
        this._queryManager = new baseQueryManager();
    }

    _getDbModel(request, modelName) {
        const { models } = request.server.plugins.db;
        modelName = modelName || this._entityName;
        return models[modelName];
    }

    _createApiRes(dbResponse) {
        console.log(dbResponse);
        return {
            data: dbResponse
        };
    }
};
