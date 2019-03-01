const Hapi = require('hapi');
const decorator = require('./decorators/index');
const { ServiceFactory } = require('../lib/services');
const Blipp = require('blipp');
const db = require('../lib/db');

module.exports = class Server {

    constructor(port, host) {
        this.server = new Hapi.server({
            port,
            host
        });
    }

    async initialize() {
        this.decorate();
        await this.register();
        await this.server.start();
    }

    async register() {
        const services = await ServiceFactory.buildPlugins();
        const dbPlugin = db.buildDbPlugin();
        await this.server.register([
            dbPlugin,
            ...services,
            {
                plugin: Blipp
            }
        ]);
    }

    getinfo() {
        return this.server.info;
    }

    decorate() {
        decorator(this.server);
    }

}