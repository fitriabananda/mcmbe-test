const { Sequelize } = require('@sequelize/core');
const config = require('../config');
const { host, user, password, database, port } = config.db;
const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'mysql'
});

async function connect() {
    console.log('Checking Sequelize connection..');
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to database.', err);
    }
}

module.exports = {
    sequelize,
    connect
}