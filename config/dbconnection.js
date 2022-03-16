
const dbConnection =(db,url)=>{
  return db.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then((re)=>{
        console.log(" mongoose connected successfully!");
     }).catch(error=>console.log(" Error occured => "+error))
}

module.exports = dbConnection;