const errLog = require('debug')('app:index:error');
const Server = require('./lib/Server');

const {
    APP_PORT: port,
    APP_HOST: host
} = process.env;

const server = new Server({
    port,
    host
});

try {
    server.init();
} catch(err) {
    errLog(err)
}