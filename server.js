if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const userRouter = require('./routers/userrouter')
const dbConnection = require('./dbconfig/connection.js')
const app = express()
const url = process.env['MONGO_URI']

// db connection function call
dbConnection(mongoose,url)

/**  setting middlewares */
// enabling body parser to accept post form data
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    }));

//enabling all cors request for all routes
app.use(cors())

app.use(flash())
// session configuration
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));
// passport configuration
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', userRouter);

/** -- end of setting middlewares */


const listener = app.listen(5000, () => {
    console.log("App listerning to port", "http://localhost:" + listener.address().port)
})