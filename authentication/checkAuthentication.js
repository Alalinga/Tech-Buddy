 function checkAuthentication (req,res,next){
    if(req.isAuthenticated()){
        //console.log("auth"+req.user._id)
          //res.send("authenticated")
       return next()
    }else{
        console.log("not auth")
         
        return  res.send("Not authenticated")
    }
}

module.exports = checkAuthentication