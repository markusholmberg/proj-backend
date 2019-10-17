var express = require('express');
var router = express.Router();
const mongo = require("mongodb").MongoClient;
const dsn = "mongodb://localhost:27017/chat";

router.get("/", async function(req, res) {
    const client  = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("crowd").find({}, { projection: { _id: 0, message: 1, user: 1, time: 1} } ).toArray(async function(err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            "data": result
        })
        await client.close();
        return result;
    });
    // await col.deleteMany();
    // await col.insertOne({message: "This is a message"});
    // await col.each(function (err, doc) {
    //     console.log(doc)
    // })
    // return result;
});

router.post("/", async function(req, res) {
    let values = {
        message: req.body.message,
        user: req.body.user,
        time: req.body.time
    }
    const client = await mongo.connect(dsn, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = await client.db();
    const col = await db.collection("crowd");
    const result = await col.insertOne(values, async function(err, result) {
        console.log("Value inserted");
        await client.close();
    });
})

module.exports = router;
