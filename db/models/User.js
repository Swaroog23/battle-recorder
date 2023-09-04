// TODO: Figure out why without this import the association breaks and error is thrown
//Error caught during initialization:  Error: User.hasMany called with something that's not a subclass of Sequelize.Model
const Battle = require('./Battle')
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