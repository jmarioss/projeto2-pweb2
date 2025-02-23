const { Sequelize } = require('sequelize');

const sequelizeInstance = new Sequelize({
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
});

module.exports = sequelizeInstance;
