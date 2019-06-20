const customerRouter = require('./CustomerRouter');
const authRouter = require('./AuthRouter');

module.exports = [
    new customerRouter(),
    new authRouter()
];