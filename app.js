const hapi = require('hapi');

const server = hapi.server({
    port: 3600,
    host: 'localhost'
});

const init = async () => {
    await server.start();
    console.log(`server started at port: ${ server.info.port }`);
};

init();
