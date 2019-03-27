const Hapi = require('hapi');
const routes = require('../lib/routers');
const Blipp = require('blipp');
const decorator = require('./decorator');

module.exports = class Server {

    constructor(port, host) {
        this._server = Hapi.server({
            port,
            host
        });
    }

    async initialize() {
        this._decorate();
        await this._register();
        await this._server.start();
        console.log(`server started at port: ${ this._server.info.port }`);
    }

    _decorate() {
        decorator(this._server);
    }

    async _register() {
        await this._server.register([
            ...routes,
            { plugin: Blipp, options: { showAuth: false } }
        ]);
    }
};
