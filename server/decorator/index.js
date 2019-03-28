const restDecorators = require('./restDecorators');
const tokenDecorators = require('./tokenDecorators');
const decorators = [
    ...restDecorators,
    ...tokenDecorators
];

const ServerDecorator = require('./ServerDecorator');
const serverDecorator = new ServerDecorator(decorators);

module.exports = (server) => {
    serverDecorator.decorate(server);
};

