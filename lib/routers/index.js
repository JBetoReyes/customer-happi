const CustomerRouter = require('./CustomerRouter');
const AuthRouter = require('./AuthRouter');

module.exports = [
    new CustomerRouter(),
    new AuthRouter()
];