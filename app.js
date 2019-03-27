const { Server } = require('./server');
const server = new Server(
    process.env.HAPI_PORT,
    process.env.HAPI_HOST
);

server.initialize();
