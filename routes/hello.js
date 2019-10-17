var express = require('express');
var router = express.Router();
const db = require("../db/database.js");

router.get('/', function(req, res) {
    var sqlAll = "select * from users";
    var params = [];

    db.all(sqlAll, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

module.exports = router;
