const db = require("../models");
const Stock = db.stock;

exports.followStock = (req, res) => {
    Stock.create({
        username: req.body.username,
        symbol: req.body.symbol
    })
        .then(stock => {
            res.send({ message: "Stock followed succesfully!" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.searchFollowedStocks = (req, res) => {
    Stock.findAll({
        where:
        {
            username: req.query.username
        }
    }).then(stocks => {
        if (!stocks) {
            return res(404).send({ message: "No stocks found for user " + req.body.username });
        }

        var symbols = [];
        stocks.forEach(stock => symbols.push(stock.symbol));
        res.status(200).send({
            symbols: symbols
        });
        // req.body.callback(symbols);
    })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.stockBoard = (req, res) => {
    res.status(200).send("Stock Content.");
};