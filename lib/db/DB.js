const Sequelize = require('sequelize');
const debug = require('debug')('app:sequelize');

module.exports = class DB {

    constructor(dbName, dbUserName, dbPassword, dbHost, dbPort, dbDialect) {
        Object.assign(this, {
            dbName, dbUserName, dbPassword, dbHost, dbDialect, dbPort
        });
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
        try {
            await this._sequelize.authenticate(); // we verify if the app can connect with the db
        } catch (err) {
            debug('%O', err);
        }
    }

    buildDbPlugin() {
        return {
            name: 'db',
            register: async (server, options) => {
                await this.initSequelize();
                server.expose('sequelize', this._sequelize);
            }
        };
    }

};