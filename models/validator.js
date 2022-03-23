const {check} = require('express-validator');

const accountsValidator = [
    check('email','Invalid email address').normalizeEmail().isEmail(),
    check('username','username must not be empty').notEmpty(),
    check('password','password must be at least 8 characters').isLength({min:8})
]
const accountsvalidator = [check('email', 'Invalid email address').normalizeEmail().isEmail(),
check('username', 'username must not be empty').notEmpty(),
check('password', 'password must be at least 8 characters').isLength({ min: 8 })
]
module.exports = accountsvalidator