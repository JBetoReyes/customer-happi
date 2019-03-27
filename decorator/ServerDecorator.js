module.exports = class ServerDecorator {
    constructor(decorators) {
        this._decorators = decorators;
    }
    decorate(server) {
        this._decorators.forEach((decorator) => {
           const { type, name, handler} = decorator;
           server.decorate(type, name, handler);
        });
    }
};
