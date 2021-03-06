const Boom = require('boom');

module.exports = [{
        type: 'toolkit',
        name: 'json',
        handler: function jsonRestDecorator (value) {
            return this.response(JSON.stringify(value))
                .type('application/json');
        }
    }, {
        type: 'toolkit',
        name: 'conflict',
        handler: function conflictRestDecorator (message) {
            return Boom.conflict(message);
        }
    }, {
        type: 'toolkit',
        name: 'unauthorized',
        handler: function unauthorizedDecorator(message) {
            return Boom.unauthorized(message);
        }
    }, {
        type: 'toolkit',
        name: 'badRequest',
        handler: function unauthorizedDecorator(message) {
            return Boom.badRequest(message);
        }
    }
];
