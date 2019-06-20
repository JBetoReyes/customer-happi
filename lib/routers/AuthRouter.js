const BaseRouter = require('./BaseRouter');
const bcrypt = require('bcrypt');
const uuidV4 = require('uuid/v4');
class AuthRouter extends BaseRouter {

    constructor() {
        super('user');
    }

    signup() {
        return {
            path: '/signup',
            name: 'signup',
            method: 'POST',
            handler: async (request, h) => {
                const user = this._getDbModel(request);
                const { userName, password } = request.payload;
                const encryptedPassword = await bcrypt.hash(password, 10);
                const newUser = await user.create({
                    id: uuidV4(),
                    userName,
                    password: encryptedPassword
                });
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