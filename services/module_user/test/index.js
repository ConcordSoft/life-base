var should = require("should"),
    config = require("../../../config/"),
    request = require('supertest'),
    jwt = require('jsonwebtoken'),
    app = require("../../../server.js");

describe("User management tests", function () {

    /*
     * USER REGISTRATION AND LOGIN APIs TEST
     */

    it("register - fail - missing data", function (done) {
        var data;
        data = {
            email: "test@gmail.com"
        };
        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("register - fail - missing data - wrong email format", function (done) {
        var data;
        data = {
            email: "test",
            password: "test"
        };
        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("register - success - valid data ", function (done) {
        var data;
        data = {
            email: "test@gmail.com",
            password: "test"
        };

        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property('status', 200);
                return done();
            });
    });

    it("register - fail - already registered", function (done) {
        var data;
        data = {
            email: "test@gmail.com",
            password: "test"
        };
        return request(app).post('/user/register')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 406);
                return done();
            });
    });

    it("login - fail - missing data", function (done) {
        var data;
        data = {
            email: "test@gmail.com"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("login - fail - invalid password", function (done) {
        var data;
        data = {
            email: "test@gmail.com",
            password: "test123"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 409);
                return done();
            });
    });

    it("login - success - valid data", function (done) {
        var data;
        data = {
            email: "test@gmail.com",
            password: "test"
        };
        return request(app).post('/user/login')
            .type('application/json').send(data).end(function (err, res) {
                res.body.should.have.property("token");
                token = res.body.token;
                client = res.body.client;
                global.client = client;
                return done();
            });
    });

    /*
     * CLIENT ACTION APIs TEST
     */

    ///client/UpdateUserProfile test
    it("Update client profile - fail - missing token", function (done) {
        var data;
        data = {
            email: "noviEmail@gmail.com",
            firstName: "first",
            lastName: "last"
        };
        return request(app).post('/user/' + client._id + '/update')
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 401);
                return done();
            });
    });

    it("Update client profile - fail - not found", function (done) {
        var data;
        data = {
            email: "noviEmail@gmail.com",
            firstName: "first",
            lastName: "last"
        };
        var token1 = jwt.sign({
            email: 'client.email',
            clientID: '5a1e98c67ecb023338a3cac3'
        }, config.token.secret, {
            expiresInMinutes: 1440 // expires in 24 hours
        });
        return request(app).post('/user/' + client._id + '/update')
            .set('x-access-token', token1)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 404);
                return done();
            });
    });

    it("Update client profile - fail - missing data", function (done) {
        var data;
        data = {
            email: "noviEmail",
            firstName: "first",
            lastName: "last"
        };
        return request(app).post('/user/' + client._id + '/update')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 400);
                return done();
            });
    });

    it("Update client profile - success - valid data", function (done) {
        var data;
        data = {
            email: "noviEmail@gmail.com",
            firstName: "Test",
            lastName: "Testoski",
        };
        return request(app).post('/user/' + client._id + '/update')
            .set('x-access-token', token)
            .type('application/json').send(data).end(function (err, res) {
                res.should.have.property("status", 200);
                return done();
            });
    });

});