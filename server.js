require('dotenv').config()
const express = require("express")
const passport = require("passport")
const flash = require('express-flash')
const session = require('express-session')
const { User, getUserByUsername, getUserById } = require("./db/models/User")
const { initDatabase } = require("./db/database")
const initPassport = require('./passportConfig')
const { chcekIfAuthenticated, checkIfNotAuthenticated } = require('./middleware')
const methodOverride = require('method-override')

const app = express()

initPassport(passport, getUserByUsername, getUserById)
initDatabase()

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.get('/register', checkIfNotAuthenticated, (req, res) => {
    res.render("register.ejs", { error: null })
})

app.post('/register', checkIfNotAuthenticated, async (req, res) => {
    const { username, password } = req.body
    User.create({
        username: username,
        password: password,
    })
    .then(() => res.redirect('/login'))
    .catch(() => {
        return res.render('register.ejs', { error: "Username already taken, provide different one" })
    }) 
})

app.get('/login', checkIfNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.post('/login', checkIfNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    }) 
)

app.delete('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { 
            return next(err);
        }
    })

    res.redirect('/login')
})

app.get('/add-battle', chcekIfAuthenticated, (req, res) => {
    res.render("addBattle.ejs", { error: null })
})

app.post('/add-battle', chcekIfAuthenticated, async (req, res) => {
    const loggedUser = await req.user()
    const user = await getUserById(loggedUser.id)
    let { isWin, enemyUsername, userArmy, enemyArmy, userScore, enemyScore } = req.body;
    isWin = isWin == 'on' 

    await user.createBattle({
        isWin: isWin,
        enemyUsername: enemyUsername,
        userArmy: userArmy,
        enemyArmy: enemyArmy,
        userScore: userScore,
        enemyScore: enemyScore
    })
    .then(() => res.redirect('/'))
    .catch(() => {
        return res.render('addBattle.ejs', { 
            error: "Error occured while adding battle entry. Try again."
         })
    }) 
})

app.get('/', chcekIfAuthenticated, async (req, res) => {
    const user = await req.user()
    res.render('index.ejs', { username: user.username })
});

app.listen(3000)
