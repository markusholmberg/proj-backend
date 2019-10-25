var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/trade";

router.get("/", async function(req, res) {
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items").find({}, { projection: { _id: 1, name: 1, price: 1, img: 1, quantity: 1} } ).toArray(async function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });
})

router.get("/:name", async function(req, res) {
    const name = req.params.name;
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items").find({ name: { $eq: name }}, { projection: { _id: 1, name: 1, price: 1, img: 1, quantity: 1} } ).toArray(async function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });
})

router.post("/updatePrice", function(req, res) {
    const user = req.body.username;
    const price = req.body.price;
    const item = req.body.item;

    db.run(`UPDATE users SET balance = balance - ? WHERE username = ?;`, [price, user], (error, rows) => {
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

router.post("/yourQuantity", async function(req, res) {
    const user = req.body.username;
    // const item = req.body.item;
    console.log(req.body)
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("userItems").find({ username: { $eq: user }}, { projection: { _id: 1, name: 1, price: 1, img: 1, user: 1} } ).toArray(async function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });

})

router.post("/updateQuantity", async function(req, res) {
    const user = req.body.username;
    const item = req.body.item;
    const quantity = req.body.quantity;

    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items");
    const result = col.updateOne({ name: { $eq: item }}, {$set: {quantity: quantity - 1}});
    await client.close();
})
module.exports = router;
