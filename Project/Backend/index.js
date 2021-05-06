const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const path = require('path');
const url = require('url');
const querystring = require('querystring');

var corsOptions = {
    origin: "http://localhost:81"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse rquests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));



// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/stock.routes')(app);

// get data route
app.get("/api", (req, res) => {
    const symbol = req.query.symbol;
    const time = req.query.time;
    const date = req.query.date;
    if (symbol && time && date) {
      data.getHistoricalPrices(symbol, time, date).then(ret => {res.json(ret.data);});
    } else if (symbol && time) {
      data.getHistoricalPrices(symbol, time).then(ret => {res.json(ret.data);});
    } else if (symbol) {
      data.getIntradayPrice(symbol).then(ret => {res.json(ret.data);});
    } else {
      res.json({ message: "Hello from server!" });
    }
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const { user } = require("./app/models");
const Role = db.role;
const User = db.user;
const Stock = db.stock;

//  db.sequelize.sync({}).then(() => {
//     console.log("Drop and Resync Db");
//     initial();
// });

db.sequelize.sync();

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "moderator"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}