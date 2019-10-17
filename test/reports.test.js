process.env.NODE_ENV = 'test';
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

const payload = {test: "testing"};
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h'});

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    describe('POST /reports/week/3', () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .post("/reports/week/5")
                .set("Content-Type", "application/json")
                .send({
                    week: "3",
                    report: "This is a test report",
                    token: token
                })
                .end(function(error, response, body) {
                    if (error) {
                        done(error);
                        console.log(error)
                    } else {
                        response.should.have.status(200);
                        done();
                    }
                });
        });
    });

    describe('POST /reports/week/3/update', () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .post("/reports/week/3/update")
                .set("Content-Type", "application/json")
                .send({
                    week: "3",
                    report: "Testing update report",
                    token: token
                })
                .end(function(error, response, body) {
                    if (error) {
                        done(error);
                    } else {
                        response.should.have.status(200);
                        done();
                    }
                });
        });
    });

    describe('POST /reports/week/2', () => {
        it("Try POST without token", (done) => {
            chai.request(server)
                .post("/reports/week/2")
                .set("Content-Type", "application/json")
                .send({
                    week: "3",
                    report: "This is a test report",
                })
                .end(function(error, res) {
                    res.should.have.status(401);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('POST /reports/week/2/update', () => {
        it("Try POST update without token", (done) => {
            chai.request(server)
                .post("/reports/week/2/update")
                .set("Content-Type", "application/json")
                .send({
                    week: "3",
                    report: "This should fail",
                })
                .end(function(error, res) {
                    res.should.have.status(401);
                    res.body.should.be.an("object");

                    done();
                });
        });
    });

    describe('GET /reports/week/3', () => {
        it('200 HAPPY PATH', (done) => {
            chai.request(server)
                .get("/reports/week/3")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    res.body.data.should.be.an("array");
                    res.body.data.length.should.be.above(0);

                    done();
                });
        });
    });
});
