const { getSequelizeInstance } = require('../database')
const { DataTypes } = require('sequelize')

const sequelize = getSequelizeInstance()

const Battle = sequelize.define('Battle', {
    isWin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    enemyUsername: {
        type: DataTypes.STRING
    },
    userArmy: {
        type: DataTypes.STRING
    },
    enemyArmy: {
        type: DataTypes.STRING
    },
    userScore: {
        type: DataTypes.INTEGER
    },
    enemyScore: {
        type: DataTypes.INTEGER
    }
})

module.exports = Battle;