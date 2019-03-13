const Sequelize = require('sequelize');

module.exports = class Customer {

    constructor(sequelize) {
        this._sequelize = sequelize;
    }

    define() {
        const customer = this._sequelize.define('customer', {
            firstName: {
                type: Sequelize.STRING,
                field: 'first_name'
            },
            lastName: {
                type: Sequelize.STRING,
                field: 'last_name'
            },
            dob: Sequelize.DATE,
            email: Sequelize.STRING
        }, {
            timestamps: false,
            underscored: true
        });

        return { customer };
    }

};