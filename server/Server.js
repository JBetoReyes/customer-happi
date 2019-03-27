const Hapi = require('hapi');
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
        this._register();
        await this._server.start();
        console.log(`server started at port: ${ this._server.info.port }`);
    }

    _decorate() {
        decorator(this._server);
    }

    _register() {
        this._server.route({
            method: 'GET',
            path: '/customers',
            handler: (request, h) => {
                return h.json({
                    "data": [
                        {
                            "id": "fedb2fa3-8f5c-5189-80e6-f563dd1cb8f9",
                            "name": 'jon',
                            "lastName": "doe",
                            "address": "some address",
                            "phone": "123-123-1234"
                        }
                    ]
                });
            }
        });
    }
};
