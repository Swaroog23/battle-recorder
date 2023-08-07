require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(`sqlite:${process.env.DB_NAME}`, {
    logging: false
})

const initDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log("Connection established")
        await sequelize.sync()
        console.log("Database is synchronized")
    }
    catch (error) {
        console.error("Error caught during initialization: ", error)
    }
}

const getSequelizeInstance = () => sequelize

module.exports = { getSequelizeInstance, initDatabase }
