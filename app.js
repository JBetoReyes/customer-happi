const Hapi = require('hapi');
const customers = require('./mocks/customers');
const server = new Hapi.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
});


server.decorate('toolkit', 'json', function (value) {
    return this.response(JSON.stringify(value))
            .type('application/json');
});

server.route({
    method: 'GET',
    path: '/customers/{id}',
    handler: (request, h) => {
        return h.json(customers);
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
