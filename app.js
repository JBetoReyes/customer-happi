const Hapi = require('hapi');
const server = new Hapi.server({
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT
});

server.route({
    method: 'GET',
    path: '/customers/{id}',
    handler: (request, h) => {
        return `hello world ${request.params.id}`;
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
