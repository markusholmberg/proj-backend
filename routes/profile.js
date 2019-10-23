var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/trade";

router.get("/:username", function(req, res) {
    db.all(`SELECT * FROM users WHERE username = ?;`, req.params.username, (error, rows) => {
        if (error) {
            res.status(400).send({"error": error.message});
            return;
        }
        res.json({
            "data": rows
        });
    })
})

router.post("/:username/update", function(req, res) {
    const user = req.body.username;
    const balance = parseInt(req.body.balance);

    db.run(`UPDATE users SET balance = balance + ? WHERE username = ?;`, [balance, user], (error, rows) => {
        if (error) {
            res.status(400).json({"error": error.message});
            return;
        }
        res.json({
            "message": "success",
            "data": rows,
        });
    })
})

router.get("/:username/items", async function(req, res) {
    const user = req.params.username;
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items").find({ user: { $eq: user }}, { projection: { _id: 1, name: 1, price: 1, img: 1, user: 1} } ).toArray(async function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });
})
module.exports = router;
