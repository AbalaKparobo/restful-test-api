const Sequelize = require('sequelize');

const sequelize = require('../database')

const Transaction = sequelize.define('transaction', {
    refID: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    reciever: {
        type: Sequelize.INTEGER
    }
})

module.exports = Transaction;