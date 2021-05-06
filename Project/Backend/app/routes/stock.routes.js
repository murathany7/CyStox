const controller = require("../controllers/stock.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
          );
          next();
    });

    app.post(
        "/api/test/follow",
        controller.followStock
    );

    app.get(
        "/api/test/search",
        controller.searchFollowedStocks
    );
};