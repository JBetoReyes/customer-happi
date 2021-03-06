const Sequelize = require('sequelize');

module.exports = class User {

    constructor(sequelize) {
        this._sequelize = sequelize;
    }

    define() {
        const user = this._sequelize.define('user',{ // we define the model in singular but sequelize adapts it to match
            userName: {
                type: Sequelize.STRING,
                field: 'user_name'
            },
            password: Sequelize.STRING
        }, {
            timestamps: false,
            underscored: true
        });

        return { user };
    }
};
