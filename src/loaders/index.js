const ExpressServer = require("./server/expressServer");
const sequelize = require("./sequelize");
const config = require("../config");
const logger = require("./logger");

const startServer = async () => {
  try {
    await sequelize.authenticate();
    logger.info("Database Loaded and Connected");

    const server = new ExpressServer();
    logger.info("Express Loaded");
    server.start();
    logger.info("#############################################");
    logger.info(`Server listening on port: ${config.port}`);
    logger.info("#############################################");
  } catch (err) {
    console.error("Unable to connect to the database!", err);
  }
};

module.exports = startServer;
