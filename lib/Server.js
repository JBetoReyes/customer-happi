const Hapi = require('hapi');
const debug = require('debug')('app:server');
const errLog = require('debug')('app:server:err');
const routesFactory = require('./factories/RouterToPluginFactory');
const routers = require('./routers');
const Blipp = require('Blipp');
const db = require('./db');
const defaultScheme = require('./authorization');
const decorators = require('./decorators')

module.exports = class Server {

    constructor(options) {
        const {
            port,
            host
        } = options;
        this._server = Hapi.Server({
            port,
            host
        });
    }

    async init(options) {
        this._decorate();
        this._setDefaultAuthScheme();
        await this._register();
        await this._start();
    }

    _decorate() {
        decorators.forEach((decorator) => {
            const { type, name, handler } = decorator;
            this._server.decorate(type, name, handler);
        });
    }

    _setDefaultAuthScheme() {
        const { name: schemeName, schemeConfig, strategy } = defaultScheme;
        this._server.auth.scheme(schemeName, schemeConfig);
        this._server.auth.strategy(strategy, schemeName);
    }

    async _register() {
        const routes = routesFactory.routersAsPlugins(routers);
        const dbPlugin = db.buildDbPlugin();
        await this._server.register([
            dbPlugin,
            ...routes,
            { plugin: Blipp, options: { showAuth: true } }
        ]);
    }

    _start() {
        return this._server.start().then(() => {
            const {
                port,
                host
            } = this._server.info;
            debug(`App running in ${ host }:${ port }`);
        }).catch(err => {
            errLog(err);
        });
    }
};