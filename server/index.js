const path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const decorator = require('./decorators/index');
const router = require('../lib/routers');
const Blipp = require('blipp');
const db = require('../lib/db');
const authSchemes = require('../lib/authorization');

module.exports = class Server {

    constructor(port, host) {
        this.server = new Hapi.server({
            port,
            host
        });
    }

    async initialize() {
        this.decorate();
        await this.addAuthSchemes();
        await this.register();
        await this.server.start();
    }

    async addAuthSchemes() {
        authSchemes.forEach((config) => {
            const { name, scheme } = config;
            this.server.auth.scheme(name, scheme);
            this.server.auth.strategy(name, name);
        });
    }

    async register() {
        const dbPlugin = db.buildDbPlugin();
        const routesPath = path.resolve(__dirname, '..', 'lib', 'routers');
        const routes = await router.routesAsPlugins(routesPath);
        await this.server.register([
            Inert,
            Vision,
            {
                plugin: HapiSwagger, options: { info : { title: 'Test API Documentation' } }
            },
            dbPlugin,
            ...routes,
            {
                plugin: Blipp, options: { showAuth: true }
            }
        ]);
    }

    getinfo() {
        return this.server.info;
    }

    decorate() {
        decorator(this.server);
    }

};
