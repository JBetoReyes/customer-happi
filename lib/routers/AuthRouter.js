const BaseRouter = require('./BaseRouter');
const UserController = require('../controllers/UserController');

class AuthRouter extends BaseRouter {

    constructor(props) {
        super('user');
        this._controller = new UserController(this._entityName);
    }

    signup() {
        return {
            path: '/signup',
            name: 'signup',
            method: 'POST',
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
            handler: async (request, h) => {

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
};

module.exports = new AuthRouter();
