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

const init = async () => {
    await server.start();
    debug(`Server listening on port: ${ server.info.port }`);
};

init();