const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../..', 'private.key'));

module.exports = [{
    type: 'toolkit',
    name: 'sign',
    handler: async ({ id, userName }) => {
        return JWT.sign( { id, userName }, privateKey, { algorithm: 'RS256' } );
    }
}];