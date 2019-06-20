const customerRouter = require('./CustomerRouter');
const AuthRouter = require('./AuthRouter');

module.exports = [
    new customerRouter(),
    new authRouter()
];