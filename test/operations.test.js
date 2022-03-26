const expect = require('chai').expect
const dbConnection = require('../config/dbconnection')
const {getAllVideos, deleteVideo} = require('../models/operations')
//dbConnection()

//describe('User operations testing',function(){

// describe(' user videos',function(){
//     this.timeout(20000)

//     it("should retrieve all videos belongs the user",async function(){
//         const videos = await getAllVideos('623bcbbad31fc2d1f606243b')
//         expect(videos[0]).to.have.property('url')
//         //console.log(videos)
//     });

//     it("should return no videos if user has no videos",async function(){
//         const videos = await getAllVideos('62397a818c7b6cab91f90ada')
//         expect(videos).to.be.equal('no videos found')
        
//     });


//     it("should return user not found if wrong user id is given",async function(){
//         const videos = await getAllVideos('623bcbb1f62397a818c7b6cab91f90adbc2d1f606243b')
//         expect(videos).to.equal('user not found')
       
//     });
    

// })
//})