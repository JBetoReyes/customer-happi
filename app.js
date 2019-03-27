const hapi = require('hapi');

const server = hapi.server({
    port: process.env.HAPI_PORT,
    host: process.env.HAPI_HOST
});

server.route({
    method: 'GET',
    path: '/customers',
    handler: (request, h) => {
        return JSON.stringify({"data" : [
            {
                "id": 1,
                "firstName": 'Jon',
                "lastName": 'Doe',
                "address": "some direction",
                "phone": "123-123-1234"
            }
        ]});
    }
});

const init = async () => {
    await server.start();
    console.log(`server started at port: ${ server.info.port }`);
};

init();
