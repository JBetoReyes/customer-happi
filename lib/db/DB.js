const Sequelize = require('sequelize');
const Models = require('./models');

module.exports = class DB {

    constructor(dbName, dbUserName, dbPassword, dbHost, dbDialect) {
        Object.assign(this, {
            dbName, dbUserName, dbPassword, dbHost, dbDialect
        });
    }

    async initDb() {
        await this.initSequelize();
        this.initModels();
    }

    async initSequelize() {
        this._sequelize = new Sequelize(this.dbName, this.dbUserName, this.dbPassword, {
            host: this.dbHost,
            dialect: this.dbDialect,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        try {
            await this._sequelize.authenticate(); // we verify if the app can connect with the db
        } catch (err) {
            console.log(err);
        }
    }

    initModels() {
        Models.forEach((Model) => {
            const model = new Model(this._sequelize);
            model.define();
        });
    }

    buildDbPlugin() {
        return {
            name: 'db',
            register: async (server, options) => {
                await this.initDb();
                server.expose('sequelize', this._sequelize);
                server.expose('models', this._sequelize.models);
            }
        };
    }
};
