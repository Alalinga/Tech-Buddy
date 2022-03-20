if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const route = require('./routers/userrouter');
const dbConnection = require('./config/dbconnection');
const swaggerJSDoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');
const swagger = require('./swagger/config');
const app = express();
const url = process.env['MONGO_URI']
const PORT = process.env["PORT"] || 5000;


const swagggerSpecs = swaggerJSDoc(swagger);


// db connection function call
dbConnection(mongoose, url)

/**  setting middlewares */
// enabling body parser to accept post form data
app.use(express.json());
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

app.use('/api', route);
app.use('/api/tech-buddy/docs', SwaggerUI.serve, SwaggerUI.setup(swagggerSpecs))

/** -- end of setting middlewares */


const listener = app.listen(PORT, () => {
  console.log("App listerning to port", "http://localhost:" + listener.address().port)
})