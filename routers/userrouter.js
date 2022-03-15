const express = require('express');
const multer = require('multer')
const route = express.Router();
const bcypt = require('bcrypt');
const passportAuthenticate = require('../authentication/authenticate');
const passport = require('passport');
const User = require('../models/schemas');


passportAuthenticate(passport)
route.post('/login', passport.authenticate('local',{}),(req,res)=>{
      return res.json({user:req.user,isAuthenticated: req.isAuthenticated()})
});

route.post('/create-accounts',async (req, res) => {
      const  encryptedPassword = await bcypt.hash(req.body.password,10)
      try{
    const createUser = User({
            username: req.body.username,
            password: encryptedPassword,
            email: req.body.email
      });
      createUser.save((err,data)=>{
          if(err)return console.log("Error occured => "+err)
         return res.json({user:data.name})
      });
}catch(e){
      res.send(e)
}
});