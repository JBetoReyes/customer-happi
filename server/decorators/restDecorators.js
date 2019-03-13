module.exports = [
    {
        name: 'json',
        type: 'toolkit',
        handler: function restDecorator (value) {
            return this.response(JSON.stringify(value)).type('application/json');
        }
    }, {
        name: 'conflict',
        type: 'toolkit',
        handler: function restDecorator (conflictMessage) {
            const message = { message: conflictMessage };
            return this
                .response(JSON.stringify(message))
                .type('application/json')
                .code(409);
        }
    }, {
        name: 'unauthorized2',
        type: 'toolkit',
        handler: function restDecorator (notFoundMessage) {
            const message = { message: notFoundMessage };
            return this
                .response(JSON.stringify(message))
                .type('application/json')
                .code(401);
        }
    }
];
