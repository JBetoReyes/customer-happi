const Sequelize = require('sequelize');

module.exports = class Customer {

    constructor(sequelize) {
        this._sequelize = sequelize;
    }

    define() {
        const customer = this._sequelize.define('customer',{ // we define the model in singular but sequelize adapts it to match
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name'
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name'
            },
            phone: Sequelize.STRING,
            email: Sequelize.STRING
        });

        return { customer };
    }
};
