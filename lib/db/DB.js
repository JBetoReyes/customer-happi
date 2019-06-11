const Sequelize = require('sequelize');
const debug = require('debug')('app:sequelize');
const Models = require('./models');

module.exports = class DB {

    constructor(dbName, dbUserName, dbPassword, dbHost, dbPort, dbDialect) {
        Object.assign(this, {
            dbName, dbUserName, dbPassword, dbHost, dbDialect, dbPort
        });
    }

    async initDb() {
        await this.initSequelize();
        await this.initModels();
    }

    async initSequelize() {
        this._sequelize = new Sequelize(this.dbName, this.dbUserName, this.dbPassword, {
            host: this.dbHost,
            dialect: this.dbDialect,
            port: this.dbPort,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        await this._sequelize.authenticate(); // we verify if the app can connect with the db
    }

    async initModels() {
        Models.forEach((Model) => {
            const model = new Model(this._sequelize);
            model.define();
        });
        await this._sequelize.sync();
    }

    buildDbPlugin() {
        return {
            name: 'db',
            register: async (server, options) => {
                try {
                    await this.initDb();
                    server.expose('sequelize', this._sequelize);
                    server.expose('models', this._sequelize.models);
                } catch (err) {
                    debug('%O', err);
                }
            }
        };
    }

};