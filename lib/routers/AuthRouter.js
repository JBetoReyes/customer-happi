const BaseRouter = require('./BaseRouter');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const uuidV4 = require('uuid/v4');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../..', 'private.key'));
const errLog = require('debug')('app:error:AuthRouter');

module.exports =  class AuthRouter extends BaseRouter {

    constructor() {
        super('user');
    }

    signup() {
        return {
            path: '/signup',
            name: 'signup',
            method: 'POST',
            handler: async (request, h) => {
                try {
                    const user = this._getDbModel(request);
                    const { userName, password } = request.payload;
                    const encryptedPassword = await bcrypt.hash(password, 10);
                    const newUser = await user.create({
                        id: uuidV4(),
                        userName,
                        password: encryptedPassword
                    });
                    const { id } = newUser;
                    const token = await JWT.sign({ id, userName }, privateKey, { algorithm: 'RS256' });
                    return {
                        userName,
                        id,
                        token
                    };
                } catch(error) {
                    errLog('O%',error);
                }
            },
            description: 'Adds a new user'
        }
    }

    login() {
        return {
            path: '/login',
            name: 'login',
            method: 'POST',
            handler: async (request, h) => {
            },
            description: 'Let users to log in the app'
        }
    }

    getConfigs() {
        return super.getConfigs([
            'login',
            'signup'
        ]);
    }
};