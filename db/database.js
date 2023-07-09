require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(`sqlite:${process.env.DB_NAME}`)

const initDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection established")
        await sequelize.sync()
        console.log("Database is synchronized")
    }
    catch (error) {
        console.error("Error caught during initialization:", error)
    }
}

module.exports = { sequelize, initDatabase }
