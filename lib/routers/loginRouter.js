const BaseRouter = require('./baseRouter');
const UserController = require('../controllers/userController');

class LoginRouter extends BaseRouter {

    constructor() {
        super('user');
        this._controller = new UserController(this._entityName);
    }

    signup() {
        return {
            path: '/signup',
            name: 'signup',
            method: 'POST',
            pre: [{
                method: async (request) => {
                    return await this._controller.getUserByName(request);
                },
                assign: 'user'
            }],
            handler: async (request, h) => {
                return await this._controller.signup(request, h);
            },
            description: 'Signup new users'
        }
    }

    login() {
        return {
            path: '/login',
            name: 'login',
            method: 'POST',
            pre: [
                { 
                    method: async (request) => {
                        return this._controller.getUserByName(request);
                    },
                    assign: 'user'
                }
            ],
            handler: async (request, h) => {
                return await this._controller.login(request, h);
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