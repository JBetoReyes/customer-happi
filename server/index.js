const Hapi = require('hapi');
const decorator = require('./decorators/index');
const { ServiceFactory } = require('../lib/services');
const Blipp = require('blipp');

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
        await this.server.register([
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