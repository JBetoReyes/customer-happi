const BaseRouter = require('./baseRouter');
const EntityService = require('../services/entityService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve( __dirname, '../..', 'private.key'));
1
class LoginRouter extends BaseRouter {

    constructor() {
        super('user');
        this._service = new EntityService(this._entityName);
    }

    signup() {
        return {
            path: '/signup',
            name: 'signup',
            method: 'POST',
            pre: [{
                method: async (request) => {
                    const userModel = this._getDbModel(request);
                    const { userName } = request.payload;
                    return await this._service.getBy(userModel, { userName });
                },
                assign: 'user'
            }],
            handler: async (request, h) => {
                const userModel = this._getDbModel(request);
                if (request.pre.user) {
                    return h.conflict('User already exist');
                }
                const { userName, password } = request.payload;
                const encryptedPassword = await bcrypt.hash(password, 10);
                const newUser = await this._service
                    .post({
                            userName,
                            password: encryptedPassword
                        }, 
                        userModel);
                const id = newUser.id;
                return h.json({
                    userName,
                    id
                });

            },
            description: 'Signup new users'
        }
    }

    login() {
        return {
            path: '/login',
            name: 'login',
            method: 'POST',
            pre: [{ 
                method: async (request, h) => {
                    const userModel = this._getDbModel(request);
                    const { userName } = request.payload;
                    return await this._service.getBy(userModel, { userName });
                },
                assign: 'user'
            }],
            handler: async (request, h) => {
                if (!request.pre.user) {
                    return h.unauthorized('Either the user or password are wrong');
                }
                const { userName, password } = request.payload;
                const { id } = request.pre.user;
                const encryptedPassword = request.pre.user.password;
                const isValid = await bcrypt.compare(password, encryptedPassword);
                if (isValid) {
                    const token = await jwt.sign({ id, userName }, privateKey, { algorithm: 'RS256'});
                    return h.json({
                        id,
                        token,
                        userName
                    });
                } else {
                    return h.unauthorized('Either the user or password are wrong');
                }
            },
            description: 'login route, if successful should return a token'
            
        }
    }

    _getRoutes() {
        return [
          'signup',
          'login' 
        ];
    }

}

module.exports = new LoginRouter();