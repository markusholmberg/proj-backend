var express = require('express');
var router = express.Router();
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/trade";

router.get("/", async function(req, res) {
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("items").find({}, { projection: { _id: 1, name: 1, price: 1, img: 1, user: 1} } ).toArray(async function(err, result) {
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
