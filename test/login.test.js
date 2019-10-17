process.env.NODE_ENV = 'test';
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');

require("dotenv").config();

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);
// 
// describe("Login", () => {
//     describe("POST /login", () => {
//         it("200 HAPPY PATH", (done) => {
//             chai.request(server)
//                 .post("/login")
//                 .set("Content-Type", "application/json")
//                 .send({
//                     email: "yeet@yeet.se",
//                     password: "asdasdasd"
//                 })
//                 .end(function(error, response, body) {
//                     if (error) {
//                         done(error);
//                     } else {
//                         response.should.have.status(200);
//                         done();
//                     }
//                 });
//         });
//     });
// });
