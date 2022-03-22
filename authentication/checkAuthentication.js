function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        return res.status(401).send("Not authenticated")
    }
}

module.exports = checkAuthentication