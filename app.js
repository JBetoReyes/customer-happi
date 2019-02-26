const customers = require('./mocks/customers');
const Server = require('./server');
const server = new Server(
    process.env.SERVER_PORT,
    process.env.SERVER_HOST,
);
try {
    const init = async () => {
        await server.initialize();
        console.log(`Running server on port: ${server.getinfo().port}`);
    }
    init();
} catch(err) {
    console.log(err.message);
}
