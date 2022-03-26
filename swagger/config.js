
module.exports={
    definition:{
      openapi: '3.0.0',
      infor:{
        title:  "Tech Buddy API",
        version : "1.1.0",
        description:"application program interface (API) that will allow user to upload and download assets (images and videos) to and from a content management platform (Cloudinary)."
      },
      servers:[
        {url:"http://localhost:5000"},
        {url:"https://tec-buddy.herokuapp.com"}
      ]
      
    },
    
    apis:['./swagger/api-docs.js']
    
  };