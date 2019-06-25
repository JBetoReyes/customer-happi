const BaseRouter = require('./BaseRouter');
const bcrypt = require('bcrypt');
const uuidV4 = require('uuid/v4');
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
                    const token = await h.sign({ id, userName });
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
                try {
                    const user = this._getDbModel(request);
                    const { userName, password } = request.payload;
                    const foundUser = await user.findOne({
                        where: {
                            userName
                        },
                        raw: true
                    });
                    if (!foundUser) {
                        return h
                            .response({ message: 'either user or password are wrong.'})
                            .code(401);
                    }
                    const { password: encryptedPassword } = foundUser;
                    const isValid = await bcrypt.compare(password, encryptedPassword);
                    if (isValid) {
                        const { id } = foundUser; // getting the id to create the token
                        const token = await h.sign(foundUser);
                        return {
                            id,
                            token,
                            userName
                        };
                    } else {
                        return h
                            .response({ message: 'either user or password are wrong.'})
                            .code(401);
                    }
                } catch (err) {
                    errLog('%O', err);
                }
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