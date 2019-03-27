module.exports = [
    {
        type: 'toolkit',
        name: 'json',
        handler: function jsonRestDecorator (value) {
            return this.response(JSON.stringify(value))
                .type('application/json');
        }
    }
];
