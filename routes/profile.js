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

router.get("/:username/getInv", async function(req, res) {
    const user = req.params.username;
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("userItems").find({ username: { $eq: user }} ).toArray(async function(err, result) {
        if (err) throw err;
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });
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

router.post("/sellItem", async function(req, res) {
    const user = req.body.username;
    const item = req.body.item;
    const price = req.body.price;

    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items");
    await col.findOneAndUpdate({ name: { $eq: item }}, {$inc: {quantity: 1}, $mul: {price: 0.93}, $push: {history: price}}, {returnOriginal: false},
        async function (err, documents) {
            await res.send({ error: err, affected: documents });
        });
    const colTwo = await db.collection("userItems");
    await colTwo.updateOne({ username: { $eq: user }, "allItems.name": item}, {$inc: {"allItems.$.quantity": -1}} )
    await client.close();
    console.log("Item sold")
})

router.post("/sellItemBalance", function(req, res) {
    const user = req.body.username;
    const price = parseInt(req.body.price);

    db.run(`UPDATE users SET balance = balance + ? WHERE username = ?;`, [price, user], (error, rows) => {
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

router.get("/:username/:item", async function(req, res) {
    const item = req.params.item;
    const user = req.params.username;
    console.log(req.params)

    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("userItems");
    await col.find({"username": user}, {allItems: {$elemMatch: {name:'Sulfuras'}}}, { projection: { name: 1, img: 1, quantity: 1} } ).toArray(async function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });
    await client.close();
})
module.exports = router;
