const request = require('supertest');
const dbConnection = require('../config/dbconnection');
const chai = require('chai')
const http = require('chai-http')
const app = require('../server');
const fs = require('fs')

const expect = chai.expect
chai.use(http)
const cookie = '';



describe("User routes", function () {

    before(function (done) {
        this.timeout(20000)
        dbConnection()
            .then(() => done())
            .catch((e) => done(e))

    });





    describe("user accounts creation", function () {

        it("POST, Should create User ", function (done) {
            request(app)
                .post('/api/create-accounts').send({ username: 'alalnga', email: 'alalnga@gmail.com', password: 'alalinga' })
                .then((res) => {
                    expect(res.status).to.equal(201);
                    // console.log(res.body,res.body.username)
                    //expect(res.body).to.equal('object')
                    expect(res.body.user).to.equal('alalnga');
                    done()
                }).catch((err) => {

                    done(err)
                })


        })

        it("POST, Should not create user without username", function () {
            request(app).post("/api/create-accounts")
                .send({ username: '', email: 'kofi@gmail.com', password: 'john' })
                .then((res) => {
                    expect(res.status).to.equal(400)
                    expect(res.error.message).to.include('is required')
                    done()
                }).catch((err) => done(err))

        });
        it("POST, Should not create user without email", function () {
            request(app).post("/api/create-accounts")
                .send({ username: 'kofi', email: '', password: 'john' })
                .then((res) => {
                    expect(res.status).to.equal(400)
                    expect(res.error.message).to.include('is required')
                    done()
                }).catch((err) => done(err))

        });
        it("POST, Should not create user if user already exist", function () {
            request(app).post("/api/create-accounts")
                .send({ username: 'kofi', email: 'kofi@gmail.com', password: 'john' })
                .then((res) => {
                    expect(res.status).to.equal(400)
                    expect(res.error.message).to.include('is required')
                    done()
                }).catch((err) => done(err))

        })

    });

    describe("User aunthentication", function () {
        it("User should be loged In", function () {
            request(app).post('/api/login')
                .send({ email: 'alalnga@gmail.com', password: 'alalinga' })
                .then((res) => {
                    //cookie = res.headers['set-cookie']

                    expect(res.statu).to.equal(200)
                    expect(res.body).to.be.an('object')
                }).catch((err) => done(err))

        });

        it("User should not be loged In without the right credentials", function () {
            request(app).post('/api/login')
                .send({ email: 'alalinga@gmail.com', password: 'alalnga' })
                .then((res) => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.text).to.be.an('Unauthorized')
                }).catch((err) => done(err))

        })
    })


    describe("GET, Get Uploaded Images", function () {

        it("User should be able to fetch images", function (done) {
            request(app).post('/api/login').send({ email: 'alalnga@gmail.com', password: 'alalinga' }).then((resp) => {

                request(app).get('/api/images').set("Cookie", resp.header['set-cookie'])
                    .then((res) => {
                        expect(res.body[0]).to.have.property('url')
                        expect(res.body[0]).to.have.property('cloudinary_key')
                        expect(res.body[0]).to.have.property('path')
                        expect(res.statusCode).to.equal(200)

                        done()
                    }).catch((err) => done(err))
            })
            it("User should not be able to fetch images without been authenticated", function (done) {

                request(app).get('/api/images')
                    .then((res) => {

                        expect(res.body.text).to.include('unauthorized')

                        expect(res.statusCode).to.equal(401)

                        done()
                    }).catch((err) => done(err))
            })
        })


    })



    describe("GET, Get Image by name", function () {

        it("User should be able to get image by name", function (done) {
            request(app).post('/api/login').send({ email: 'alalnga@gmail.com', password: 'alalinga' }).then((resp) => {

                request(app).get('/api/images/{name}').set("Cookie", resp.header['set-cookie'])
                    .then((res) => {
                        expect(res.body[0]).to.have.property('url')
                        expect(res.body[0]).to.have.property('cloudinary_key')
                        expect(res.body[0]).to.have.property('path')
                        expect(res.statusCode).to.equal(200)

                        done()
                    }).catch((err) => done(err))
            });
        });
        it("User should be able to get image by name without passing the right name", function (done) {
            request(app).post('/api/login').send({ email: 'alalnga@gmail.com', password: 'alalinga' }).then((resp) => {

                request(app).get('/api/images/{name}').set("Cookie", resp.header['set-cookie'])
                    .then((res) => {
                        // expect(res.body[0]).to.have.property('url')
                        // expect(res.body[0]).to.have.property('cloudinary_key')
                        expect(res.text).to.include('not found')
                        expect(res.statusCode).to.equal(404)

                        done()
                    }).catch((err) => done(err))
            });
        });
        it("User should not be able to get images by name without been authenticated", function (done) {

            request(app).get('/api/images/{name}')
                .then((res) => {

                    expect(res.body.text).to.include('unauthorized')

                    expect(res.statusCode).to.equal(401)

                    done()
                }).catch((err) => done(err))
        })



    })


    describe("POST, User upload Images", function () {
        it("User should be able to upload single or multiple images", function (done) {
            request(app).post('/api/login').send({ email: 'alalnga@gmail.com', password: 'alalinga' }).then((resp) => {

                request(app).post('/api/images/').set("Cookie", resp.header['set-cookie'])
                    .send({ description: "Images uploaded through testing" })
                    .attach('image', fs.readFileSync(`${__dirname}/images/im1.png`), 'im1.png')
                    .attach('image', fs.readFileSync(`${__dirname}/images/im2.png`), 'im2.png')
                    .then((res) => {
                        
                        //     expect(res.body[0]).to.have.property('url')
                        //     expect(res.body[0]).to.have.property('cloudinary_key')
                        //     expect(res.body[0]).to.have.property('path')
                        expect(res.statusCode).to.equal(201)
                        expect(res.text).to.equal('created')

                        done()
                    }).catch((err) => done(err))
            });
        });
        it("User should not be able to upload single or multiple images without been authenticated", function (done) {
            // request(app).post('/api/login').send({ email: 'alalnga@gmail.com', password: 'alalinga' }).then((resp) => {

            request(app).post('/api/images/')
                .send({ description: "Images uploaded through testing" })
                .attach('image', fs.readFileSync(`${__dirname}/images/im1.png`), 'im1.png')
                .attach('image', fs.readFileSync(`${__dirname}/images/im2.png`), 'im2.png')
                .then((res) => {
                    //     expect(res.body[0]).to.have.property('url')
                    //     expect(res.body[0]).to.have.property('cloudinary_key')
                    //     expect(res.body[0]).to.have.property('path')
                    expect(res.statusCode).to.equal(401)
                    expect(res.text).to.equal('Unauthorized')

                    done()
                }).catch((err) => done(err))
            // });
        });

    })


})
