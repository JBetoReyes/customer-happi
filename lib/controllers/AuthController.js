const BaseController = require('./BaseController');
const bcrypt = require('bcrypt');

module.exports = class AuthController extends BaseController {
    constructor(entityName) {
        super(entityName);
    }

    async login(request, h) {
        if (!request.pre.user) {
            return h.unauthorized('Either the user or password are wrong.');
        }
        const { userName, password } = request.payload;
        const { password: encryptedPassword } = request.pre.user;
        const isValid = await bcrypt.compare(password, encryptedPassword);
        if (isValid) {
            const { id } = request.pre.user; // getting the id to create the token
            const token = await h.sign(request.pre.user);
            return h.json({
                id,
                token,
                userName
            });
        } else {
            return h.unauthorized('Either the user or password are wrong.');
        }

    }

};
