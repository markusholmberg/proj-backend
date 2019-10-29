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
    const col = await db.collection("items").find({ name: { $eq: name }}, { projection: { _id: 1, name: 1, price: 1, img: 1, quantity: 1, history: 1} } ).toArray(async function(err, result) {
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
    const item = req.body.item;

    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("userItems");
    const result = col.updateOne({ username: { $eq: user }, "allItems.name": item}, {$inc: {"allItems.$.quantity": 1}} );
    await client.close();
})

router.post("/updateQuantity", async function(req, res) {
    const item = req.body.item;
    const price = req.body.price;

    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items");
    const result = await col.findOneAndUpdate({ name: { $eq: item }}, {$inc: {quantity: -1}, $mul: {price: 1.05}, $push: {history: price}}, {returnOriginal: false},
        async function (err, documents) {
            await res.send({ error: err, affected: documents });
        }
    );
    await client.close();
})
module.exports = router;
