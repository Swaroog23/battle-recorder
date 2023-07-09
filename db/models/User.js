const { hashUserPassword } = require('./db_utils')
const sequelize = require('./database')
const { DataTypes } = require('sequelize')

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

module.exports = User