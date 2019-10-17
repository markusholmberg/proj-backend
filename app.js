const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");

require("dotenv").config();

const index = require('./routes/index');
const hello = require('./routes/hello');
const reports = require('./routes/reports');
const register = require('./routes/register');
const login = require('./routes/login');
const chat = require('./routes/chat');

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
app.use('/hello', hello);
app.use("/reports", reports);
app.use("/register", register);
app.use("/login", login);
app.use("/chat", chat);

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
