const Hapi = require('hapi');
const debug = require('debug')('app:server');
const errLog = require('debug')('app:server:err');
const routesFactory = require('./factories/RouterToPluginFactory');
const routers = require('./routers');
const Blipp = require('Blipp');

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
        await this._register();
        await this._start();
    }

    async _register() {
        const routes = routesFactory.routersAsPlugins(routers);
        await this._server.register([
            ...routes,
            { plugin: Blipp, options: { showAuth: false } }
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