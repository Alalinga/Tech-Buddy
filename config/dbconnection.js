if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose');
const url = process.env['MONGO_URI']

const dbConnection =()=>{
  return mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((re)=>{
        console.log(" mongoose connected successfully!");
     }).catch(error=>console.log(" Error occured => "+error))
}

module.exports = dbConnection;