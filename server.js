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
    res.render("register.ejs")
})

app.post('/register', checkIfNotAuthenticated, async (req, res) => {
    const { username, password } = req.body
    User.create({
        username: username,
        password: password,
    })
    .then(() => res.redirect('/login'))
    .catch(() => {
        return res.redirect('/register')
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

app.get('/', chcekIfAuthenticated, (req, res) => {
    res.render('index.ejs')
});

app.listen(3000)


// app.post('/login', (req, res) => {

// })