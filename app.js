const Hapi = require('hapi');
const customers = require('./mocks/customers');
const decorator = require('./server/decorators');
const Blipp = require('blipp');

const server = new Hapi.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
});

decorator(server);

server.route({
    method: 'GET',
    path: '/customers/{id}',
    config: {
        description: 'Queries a customer',
        handler: (request, h) => {
            return h.json(customers);
        },
    }
});

try {
    const init = async () => {
        await server.register({
            plugin: Blipp
        });
        await server.start();
	console.log(`Running server on port: ${server.info.port}`);    
    }
    init();
} catch(err) {
    console.log(err.message);
}
