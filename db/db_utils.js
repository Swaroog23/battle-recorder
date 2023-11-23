const bcrypt = require('bcrypt')

const hashUserPassword = async (user) => {
    const hashedPass = await bcrypt.hash(user.password, 10)
    user.password = hashedPass
    return user
}

const mapEmptyField = (field) => { 
        return !field ? "Empty" : field 
    }

module.exports = { hashUserPassword, mapEmptyField }
