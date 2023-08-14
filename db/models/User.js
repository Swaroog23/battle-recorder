const { hashUserPassword } = require('../db_utils')
const { getSequelizeInstance } = require('../database')
const { DataTypes } = require('sequelize')

const sequelize = getSequelizeInstance()

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

User.beforeCreate(async (user) => {
    user = await hashUserPassword(user)
})

User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
        user = await hashUserPassword(user)
    }
})


const getUserByUsername = async (username) => {
    return await User.findOne({ where: { username: username } })
}

const getUserById = async (id) => {
    return await User.findOne({ where: { id: id } })
}

module.exports = { User, getUserByUsername, getUserById }