const BaseController = require('./BaseController');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, '../..', 'private.key'));

module.exports = class UserController extends BaseController {
    constructor(entityName) {
        super(entityName);
    }

    async postUser(request, h) {
        const user = this._getDbModel(request);
        const { userName, password } = request.payload;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await this._queryManager.post({
            userName,
            encryptedPassword
        }, user);
        const { id } = newUser;
        const token = await JWT.sign({ id, userName }, privateKey, { algorithm: 'RS256' });
        return h.json({
            userName,
            id,
            token,
        });
    }
};
