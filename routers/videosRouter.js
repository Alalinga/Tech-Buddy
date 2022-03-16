const express = require('express');
const multerUpload = require('../config/multer')
const route = express.Router();
const passport = require('passport');
const User = require('../models/schemas');


passportAuthenticate(passport)


route.post('/upload-videos', multerUpload.single(), async (req, res, next) => {
    try {
        res.json(req.file)

    }catch(e){
      res.json(e)
    }
});

route.get('/vedios', async (req, res, next) => {
    
})
