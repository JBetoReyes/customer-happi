const Hapi = require('hapi');
const customers = require('./mocks/customers');
const server = new Hapi.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
});

server.route({
    method: 'GET',
    path: '/customers/{id}',
    handler: (request, h) => {
        const response = h.response(JSON.stringify(customers));
        return response;
    }
});

try {
    const init = async () => {
        await server.start();
	console.log(`Running server on port: ${server.info.port}`);    
    }
    init();
} catch(err) {
    console.log(err.message);
}
