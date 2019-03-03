const Walk = require('../../../utils/files/walk');

module.exports = class ModelManager {
    
    constructor(sequelize) {
        this._sequelize = sequelize;
    }

    defineModels() {
        return new Promise(async (resolve, reject) => {
            const files = await Walk.filesDeep(__dirname)
            const models = files
                .filter((file) => !/.*index.js/.test(file))
                .reduce((models, filePath) => {
                    const Model = require(filePath);
                    const model = new Model(this._sequelize);
                    return Object.assign(models, model.define());
                }, {})

            resolve(models);
        });
    }

}