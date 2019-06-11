const {
    DATABASE_NAME,
    DATABASE_USER_NAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_DIALECT
} = process.env;

const DB = require('./DB');
const db = new DB(
    DATABASE_NAME,
    DATABASE_USER_NAME,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_DIALECT);

module.exports = db;
