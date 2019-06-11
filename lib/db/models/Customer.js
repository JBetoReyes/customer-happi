const Sequelize = require('sequelize');

module.exports = class Customer {
    
    constructor(sequelize) {
        this.sequelize = sequelize;
    }

    define() {
        this.sequelize.define('customer', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
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
    }
}
