const hapi = require('hapi');

const server = hapi.server({
    port: process.env.HAPI_PORT,
    host: process.env.HAPI_HOST
});

const json = function restJsonDecorator (value) {
    return this.response(value)
        .type('application/json');
};

server.decorate('toolkit', 'json', json);

server.route({
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

const init = async () => {
    await server.start();
    console.log(`server started at port: ${ server.info.port }`);
};

init();
