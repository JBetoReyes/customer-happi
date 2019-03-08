const path = require('path');
const Hapi = require('hapi');
const decorator = require('./decorators/index');
const router = require('../lib/routers');
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
        const dbPlugin = db.buildDbPlugin();
        const routesPath = path.resolve(__dirname, '..', 'lib', 'routers');
        const routes = await router.routesAsPlugins(routesPath);
        await this.server.register([
            dbPlugin,
            ...routes,
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