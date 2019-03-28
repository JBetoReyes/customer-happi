const routesFactory = require('../factories/BaseRouterFactory');

const customerRouter = require('./customerRouter');
const authRouter = require('./AuthRouter');
const routers = [
    customerRouter,
    authRouter
];

module.exports = routesFactory.routesAsPlugins(routers);


