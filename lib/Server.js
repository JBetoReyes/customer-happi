const Hapi = require('hapi');
const debug = require('debug')('app:server');
const errLog = require('debug')('app:server:err');

module.exports = class Server {

    constructor(options) {
        this._init(options);
        this._register();
    }

    _init(options) {
        const {
            port,
            host
        } = options;
        this._server = Hapi.Server({
            port,
            host
        });
    }

    _register() {
        this._server.route({
            method: 'GET',
            path: '/customers',
            handler: (request, h) => {
                return {
                    "data": [
                        {
                            "id": "3880f788-4c03-4fd6-889f-95c09983710a",
                            "firstName": "jon",
                            "lastName": "doe",
                            "phone": "132-123-1134",
                            "email": "myEmail@email.com"
                        },
                        {
                            "id": "3a8fbfc8-525a-49d9-9286-a8e4caf4f4a7",
                            "firstName": "jon",
                            "lastName": "doe",
                            "phone": "132-123-1134",
                            "email": "myEmail@email.com"
                        },
                        {
                            "id": "c07de8fb-c873-421f-a383-5fb4f6bae479",
                            "firstName": "Jesus",
                            "lastName": "Juan",
                            "phone": "132-123-1134",
                            "email": "myEmail@email.com"
                        }
                    ]
                }
            }
        });
    }

    start() {
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