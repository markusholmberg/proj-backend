const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

require("dotenv").config();

const index = require('./routes/index');
const register = require('./routes/register');
const login = require('./routes/login');
const trade = require('./routes/trade');
const profile = require('./routes/profile');

const port = 8333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// don't show the log when it is test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
}



app.use('/', index);
app.use("/register", register);
app.use("/login", login);
app.use("/trade", trade);
app.use("/profile", profile);

app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});

app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});

app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});



// Start up server
const server = app.listen(port, () => console.log(`Example API listening on port ${port}!`));

module.exports = server;
