module.exports = [
    {
        name: 'json',
        type: 'toolkit',
        handler: function jsonDecorator (value) {
            return this.response(JSON.stringify(value)).type('application/json');
        }
    }
]