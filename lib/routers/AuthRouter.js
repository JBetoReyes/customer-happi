const BaseRouter = require('./BaseRouter');
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