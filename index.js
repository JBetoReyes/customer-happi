const Hapi = require('hapi');
const debug = require('debug')('app:index');

const {
    APP_PORT,
    APP_HOST
} = process.env;

const server = Hapi.server({
    port: APP_PORT,
    host: APP_HOST
});

server.route({
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

const init = async () => {
    await server.start();
    debug(`Server listening on host: ${server.info.host} port: ${server.info.port}`);
};

init();