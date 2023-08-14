const chcekIfAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

const checkIfNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    }

    return next()
}

module.exports = { chcekIfAuthenticated, checkIfNotAuthenticated }
