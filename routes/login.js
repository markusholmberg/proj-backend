var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

require("dotenv").config();

router.post('/', (req, res, next) => {
    var email = req.body.email;
    const secret = process.env.JWT_SECRET;
    const payload = { email: req.body.email };

    console.log(req.body);


    db.all(`SELECT * FROM users WHERE email = '?'`, [email], (error, rows) => {
        const token = jwt.sign(payload, secret, { expiresIn: '1h'});

        bcrypt.compare(req.body.password, rows[0].password, function(err, response) {
            if (response === true) {
                return token;
            } else {
                return false;
                console.log("Wrong password or email");
            }
        });
        if (error) {
            res.status(400).json({"error": error.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows,
            "token": token
        });
    });
});

module.exports = router;
