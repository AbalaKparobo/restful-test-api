const Sequelize = require('sequelize');

// const sequelize = new Sequelize(process.env.db_name-local, 'root', process.env.db_password-local, {
//     dialect: 'mysql',
//     host: process.env.db_host-local
// });

const sequelize = new Sequelize(process.env.db_name, process.env.db_username, process.env.db_password, {
    dialect: 'mysql',
    host: process.env.db_host
});

module.exports = sequelize;