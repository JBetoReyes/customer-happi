const hapi = require('hapi');

const server = hapi.server({
    port: process.env.HAPI_PORT,
    host: process.env.HAPI_HOST
});

server.route({
    method: 'GET',
    path: '/customers',
    handler: (request, h) => {
        const response = h.response(JSON.stringify({
            "data": [
                {
                    "id": "fedb2fa3-8f5c-5189-80e6-f563dd1cb8f9",
                    "name": 'jon',
                    "lastName": "doe",
                    "address": "some address",
                    "phone": "123-123-1234"
                }
            ]
        }));
        response.type('application/json');

        return response;
    }
});

const init = async () => {
    await server.start();
    console.log(`server started at port: ${ server.info.port }`);
};

init();
