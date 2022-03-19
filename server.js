if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const passport = require('passport')
const route = require('./routers/userrouter')
const dbConnection = require('./config/dbconnection')
const swaggerJSDoc = require('swagger-jsdoc');
const  SwaggerUI  = require ('swagger-ui-express');

const app = express()
const url = process.env['MONGO_URI']
const PORT = process.env["PORT"] || 5000;

const option = {
    definition:{
      openapi: '3.0.0',
      infor:{
        title:  "Tech Buddy API",
        version : "1.0",
        description:"application program interface (API) that will allow user to upload and download assets (images and videos) to and from a content management platform (Cloudinary)."
      },
      servers:[
        {url:"http://localhost:5000"},
        // {url:"https://alalinga.herokuapp.com"}
      ]
      
    },
    apis:["./routers/userrouter.js"]
  };

  const swagggerSpecs = swaggerJSDoc(option);


// db connection function call
dbConnection(mongoose,url)

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
app.use('/api/tech-buddy/docs',SwaggerUI.serve, SwaggerUI.setup(swagggerSpecs))

/** -- end of setting middlewares */


const listener = app.listen(PORT, () => {
    console.log("App listerning to port", "http://localhost:" + listener.address().port)
})