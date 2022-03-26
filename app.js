
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');
const route = require('./routers/userrouter');
const swaggerJSDoc = require('swagger-jsdoc');
const SwaggerUI = require('swagger-ui-express');
const swagger = require('./swagger/config');
const app = express();


const swagggerSpecs = swaggerJSDoc(swagger);




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
app.use((req,res,next)=>{
    return res.status(404).json({error:'not found'});
 })
app.use((err,req,res,next)=>{
   return res.status(500).json({error:err});
})


module.exports = app;