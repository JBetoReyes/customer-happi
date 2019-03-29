const BaseRouter = require('./BaseRouter');
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');
const { authValidators: requestValidators } = require('../joi/requests');

class AuthRouter extends BaseRouter {

    constructor() {
        super('user');
        this._controller = new UserController(this._entityName);
        this._authController = new AuthController(this._entityName);
    }

    signup() {
        return {
            path: '/signup',
            name: 'signup',
            method: 'POST',
            tags: ['api'],
            validate: requestValidators.signup,
            pre: {
                method: async (request) => {
                    return await this._controller.getUserByName(request);
                },
                assign: 'user'
            },
            handler: async (request, h) => {
                return await this._controller.postUser(request, h);
            },
            description: 'Adds a new customer'
        }
    }

    login() {
        return {
            path: '/login',
            name: 'login',
            method: 'POST',
            tags: ['api'],
            validate: requestValidators.login,
            pre: {
                method: async (request) => {
                    return await this._controller.getUserByName(request);
                },
                assign: 'user'
            },
            handler: async (request, h) => {
                return await this._authController.login(request, h);
            },
            description: 'Let users log in the app'
        }
    }

    _getRoutes() {
        return [
            'login',
            'signup'
        ]
    }
}

module.exports = new AuthRouter();
