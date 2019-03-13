const defaultScheme = require('./DefaultAuthScheme');

module.exports = [
    {
        name: 'default',
        scheme: defaultScheme.scheme.bind(defaultScheme)
    }
];