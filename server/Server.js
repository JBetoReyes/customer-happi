const Hapi = require('hapi');
const routes = require('../lib/routers');
const Blipp = require('blipp');
const decorator = require('./decorator');
const db = require('../lib/db');
const defaultScheme = require('./authorization');

module.exports = class Server {

    constructor(port, host) {
        this._server = Hapi.server({
            port,
            host
        });
    }

    async initialize() {
        this._decorate();
        this._setDefaultAuthScheme();
        await this._register();
        await this._server.start();
        console.log(`server started at port: ${ this._server.info.port }`);
    }

    _setDefaultAuthScheme() {
        const { name: schemeName, schemeConfig, strategy } = defaultScheme;
        this._server.auth.scheme(schemeName, schemeConfig);
        this._server.auth.strategy(strategy, schemeName);
    }

    _decorate() {
        decorator(this._server);
    }

    async _register() {
        const dbPlugin = db.buildDbPlugin();
        await this._server.register([
            dbPlugin,
            ...routes,
            { plugin: Blipp, options: { showAuth: true } }
        ]);
    }
};
