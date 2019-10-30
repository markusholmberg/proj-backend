var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/trade";

async function addData() {
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items");
    const result = await col.insertMany(
        {name: "Swift Spectral Tiger", quantity: 0, img: "tiger.jpg", price: 3500, history: []},
        {name: "Magic Rooster", quantity: 0, img: "rooster.jpg", price: 1500, history: []},
        {name: "Thunderfury", quantity: 0, img: "thunderfury.jpg", price: 1000, history: []},
        {name: "Sulfuras", quantity: 0, img: "sulfuras.jpg", price: 1000, history: []},
        {name: "Feldrake", quantity: 0, img: "feldrake.jpg", price: 500, history: []},
        {name: "Tabard of Frost", quantity: 0, img: "tabard.jpg", price: 1500, history: []},
        {name: "X-51 Nether Rocket X-TREME", quantity: 0, img: "rocket.jpg", price: 300, history: []}
    );
    async function(err, result) {
        console.log("Value inserted");
        console.log(result)
        if (err) {
            await console.log(err)
        };
        await client.close();
    });
}
