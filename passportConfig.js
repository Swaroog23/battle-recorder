const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const initPassport = (passport, getUserByUsername, getUserById) => {
    const authenticateUser = async (username, password, done) => {
        const errorMsg = 'No email with that user'
        const user = await getUserByUsername(username)

        if (user == null) {
            return done(null, false, { message: errorMsg})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                const loggedUser = {
                    id: user.id,
                    username: user.username
                }
                return done(null, loggedUser)
            } else {
                return done(null, false, { message: errorMsg})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(
        new LocalStrategy({ usernameField: 'username' }, 
        authenticateUser
    ))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => done(null, async () => {
        let userToDeserialize = null
        await getUserById(id)
            .then(user => {
                userToDeserialize = {
                    id: user.id,
                    username: user.username
                }
                return
            })
        return userToDeserialize
    }))
}

module.exports = initPassport
