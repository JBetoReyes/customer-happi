const hapi = require('hapi');

const server = hapi.server({
    port: process.env.HAPI_PORT,
    host: process.env.HAPI_HOST
});

const init = async () => {
    await server.start();
    console.log(`server started at port: ${ server.info.port }`);
};

init();
