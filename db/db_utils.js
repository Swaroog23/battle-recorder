const bcrypt = require('bcrypt')

const hashUserPassword = async (user) => {
    const hashedPass = await bcrypt.hash(user.password, 10)
    user.password = hashedPass
    return user
}

module.exports = { hashUserPassword }
