var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const bcrypt = require("bcrypt");
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/trade";


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

router.post("/addItems", async function (req, res) {
    const username = req.body.username;

    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("userItems");
    const result = await col.insertOne({ username: username, allItems: [
        {name: "Swift Spectral Tiger", quantity: 0},
        {name: "Magic Rooster", quantity: 0},
        {name: "Thunderfury", quantity: 0},
        {name: "Sulfuras", quantity: 0},
        {name: "Feldrake", quantity: 0},
        {name: "Tabard of Frost", quantity: 0},
        {name: "X-51 Nether Rocket X-TREME", quantity: 0},
    ] },
    async function(err, result) {
        console.log("Value inserted");
        console.log(result)
        if (err) {
            await console.log(err)
        };
        await client.close();
    });
})

module.exports = router;
