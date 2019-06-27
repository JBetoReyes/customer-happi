const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../..', 'private.key'));
const publicKey = fs.readFileSync(path.resolve(__dirname, '../..', 'public.key'));

module.exports = [{
        type: 'toolkit',
        name: 'sign',
        handler: async ({ id, userName }) => {
            return JWT.sign( { id, userName }, privateKey, { algorithm: 'RS256' } );
        }
    }, {
        type: 'toolkit',
        name: 'decode',
        handler: async (token, scheme, key = publicKey) => {
            const userCredentials = await new Promise((resolve, reject) => {
                JWT.verify(token, key, (err, decodedToken) => {
                    if (err) {
                        reject(err)
                    }
                    resolve(decodedToken)
                });
            });
            return userCredentials;
        }
    }
];