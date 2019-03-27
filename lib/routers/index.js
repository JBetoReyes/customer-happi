const routesFactory = require('../factories/BaseRouterFactory');

const customerRouter = require('./customerRouter');
const routers = [
    customerRouter
];

module.exports = routesFactory.routesAsPlugins(routers);


