const { validationResult } = require('express-validator')
const bcypt = require('bcrypt');
const User = require('../models/schemas');


const creatAccounts = (req, res) => {
    try {
        validationResult(req).throw();

        bcypt.hash(req.body.password, 10)
            .then((result) => {
                const createUser = User({
                    username: req.body.username,
                    password: result,
                    email: req.body.email
                });
                createUser.save((err, data) => {
                    if (err) return res.status(400).json({ error: err })
                    return res.status(201).json({ user: data.username })
                });
            }).catch((error) => {
                return res.status(400).json({ error: "error occored " + error })
            });
    } catch (err) {
        let messages = []
        for (er of err.errors) {
            messages.push(er.msg)
        }
        return res.status(400).json(messages);
    }
}

const userLogin = (req, res) => {
    // if (!req.isAuthenticated) return res.json(req.authInfo)
    return res.status(200).json({ user: req.user.name, isAuthenticated: req.isAuthenticated() })

}


module.exports = {creatAccounts,userLogin}