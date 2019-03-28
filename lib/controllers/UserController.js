const BaseController = require('./BaseController');
const bcrypt = require('bcrypt');

module.exports = class UserController extends BaseController {
    constructor(entityName) {
        super(entityName);
    }

    async getUserByName(request) {
        const user = this._getDbModel(request);
        const { userName } = request.payload || request.query;
        return await this._queryManager.getOneBy({ userName }, user);
    }

    async postUser(request, h) {
        if (request.pre.user) return h.conflict('user name already taken.');
        const user = this._getDbModel(request);
        const { userName, password } = request.payload;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await this._queryManager.post({
            userName,
            password: encryptedPassword
        }, user);
        const { id } = newUser;
        const token = await h.sign(newUser);
        return h.json({
            userName,
            id,
            token,
        });
    }

};
