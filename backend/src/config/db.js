const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // This creates a file in your project folder
    logging: false
});

module.exports = sequelize;