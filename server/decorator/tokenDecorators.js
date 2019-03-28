const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../..', 'private.key'));

module.exports = [{
    type: 'toolkit',
    name: 'sign',
    handler: async function jsonRestDecorator (user) {
        const { id, userName } = user;
        return JWT.sign( { id, userName }, privateKey, { algorithm: 'RS256' });
    }
}];
