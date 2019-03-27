const restDecorators = require('./restDecorators');
const decorators = [
    ...restDecorators
];

const ServerDecorator = require('./ServerDecorator');
const serverDecorator = new ServerDecorator(decorators);

module.exports = (server) => {
    serverDecorator.decorate(server);
};

