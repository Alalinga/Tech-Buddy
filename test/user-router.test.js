const request = require('super-test')
const expect = require('chai').expect
const router = require('../routers/userrouter')


describe("user route", function(){
    it("GET, api/images should return list of images that belongs to the user", async function(){
       try{
        const result = await request(router).get('/images')

       }catch(e){
           throw Error(e)
       }

    })
})