const Sequelize = require('sequelize');

const sequelize = require('../database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    middlename: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ss: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
})

module.exports = User;