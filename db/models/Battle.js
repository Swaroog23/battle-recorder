const { getSequelizeInstance } = require('../database')
const { DataTypes } = require('sequelize')
const { mapEmptyField } = require('../db_utils')

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

Battle.beforeCreate(async (battle) => {
    const fieldsToMap = ["enemyUsername", "userArmy", "enemyArmy", "userScore", "enemyScore"]

    Object.entries(battle.dataValues).forEach(([key, value]) => {
        if (fieldsToMap.includes(key)) {
            battle.dataValues[key] = mapEmptyField(value)
        }
    })
})

const getBattlesByUserId = async (userId) => {
    return await Battle.findAll({ where: { UserId: userId } })
}

module.exports = { Battle, getBattlesByUserId };