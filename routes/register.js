var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const bcrypt = require("bcrypt");
// const myPlaintextPassword = 'longandhardP4$$w0rD';
// const hash = 'superlonghashedpasswordfetchedfromthedatabase';


router.post('/', (req, res, next) => {
    const saltRounds = 10;

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.run("INSERT INTO users (username, email, password, balance) VALUES (?, ?, ?, 0)",
            req.body.username,
            req.body.email,
            hash, err => {
                if (err) {
                    res.status(400).json({"error": err.message});
                    return;
                } else {
                    res.status(201).send();
                }
            });
    });
});

module.exports = router;
