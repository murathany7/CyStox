module.exports = (sequelize, Sequelize) => {
    const Stock = sequelize.define("stocks", {
        username: {
            type: Sequelize.STRING
        },
        symbol: {
            type: Sequelize.STRING
        }
    });

    return Stock;
};