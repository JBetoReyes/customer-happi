const Sequelize = require('sequelize');
const ModelManager = require('./models');
const {
    DATABASE_NAME,
    DATABASE_USER_NAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABSE_DIALECT
} = process.env;

module.exports = class Db {

    async initSequelize() {
        this.sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER_NAME, DATABASE_PASSWORD, {
            host: DATABASE_HOST,
            dialect: DATABSE_DIALECT,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
              }
        });
        try {
            await this.initModels();
            await this.sequelize.authenticate();
        } catch (err) {
            console.log(err);
        }

    }

    buildDbPlugin() {
        return {
            name: 'db',
            register: async function (server, options) {
                await this.initSequelize();
                server.expose('sequelize', this.sequelize);
                server.expose('models', this.models);
            }.bind(this)
        };
    }

    async initModels() {
        const modelManager = new ModelManager(this.sequelize); 
        this.models = await modelManager.defineModels();
    }

};