var express = require('express');
var router = express.Router();
const db = require("../db/database.js");
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/trade";

async function addData() {
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    await db.collection("items").drop();
    await db.createCollection("items");
    const col = await db.collection("items");
    await col.insertMany([
        {name: "Swift Spectral Tiger", quantity: 35, img: "tiger.jpg", price: 3500, history: []},
        {name: "Magic Rooster", quantity: 55, img: "rooster.jpg", price: 1500, history: []},
        {name: "Thunderfury", quantity: 44, img: "thunderfury.jpg", price: 1000, history: []},
        {name: "Sulfuras", quantity: 32, img: "sulfuras.jpg", price: 1000, history: []},
        {name: "Feldrake", quantity: 78, img: "feldrake.jpg", price: 500, history: []},
        {name: "Tabard of Frost", quantity: 54, img: "tabard.jpg", price: 1500, history: []},
        {name: "X-51 Nether Rocket X-TREME", quantity: 98, img: "rocket.jpg", price: 300, history: []}
    ]);
    await client.close();
}
addData();
