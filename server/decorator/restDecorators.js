const Boom = require('boom');

module.exports = [
    {
        type: 'toolkit',
        name: 'json',
        handler: function jsonRestDecorator (value) {
            return this.response(JSON.stringify(value))
                .type('application/json');
        }
    },
    {
        type: 'toolkit',
        name: 'conflict',
        handler: function conflictRestDecorator (message) {
            return Boom.conflict(message);
        }
    }
];
