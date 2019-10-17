process.env.NODE_ENV = 'test';
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe("Register", () => {
    describe("POST /register", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .post("/register")
                .set("Content-Type", "application/json")
                .type("form")
                .send({
                    firstname: "Yeet",
                    lastname: "Yeeter",
                    email: "yeet@yeet.se",
                    password: "asdasdasd",
                    year: 2012,
                    month: "September",
                    day: 22
                })
                .end(function(error, response, body) {
                    if (error) {
                        done(error);
                    } else {
                        response.should.have.status(201);
                        done();
                    }
                });
        });
    });

    describe("POST /login", () => {
        it("200 HAPPY PATH", (done) => {
            chai.request(server)
                .post("/login")
                .set("Content-Type", "application/json")
                .send({
                    email: "yeet@yeet.se",
                    password: "asdasdasd"
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
});
