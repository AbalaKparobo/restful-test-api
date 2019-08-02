const Sequelize = require('sequelize');

const sequelize = require('../database');

const Account = sequelize.define('account', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    accNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    accType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    accBal: {
        type: Sequelize.FLOAT,
        allowNull: false,
        default: 0
    }
    // accHistory: [],
    // accMgr: {
    //     name: Sequelize.STRING,
    //     phone: Sequelize.STRING,
    //     email: Sequelize.STRING
    // }
})

module.exports = Account;