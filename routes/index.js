var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    const data = {
        name: "Markus Holmberg",
        placeofbirth: "Singapore",
        about: "I'm 21 years old. Studying my third year of Webprogramming at Blekinge Institute of Technology"
    };
    
    res.json(data);
});
module.exports = router;
