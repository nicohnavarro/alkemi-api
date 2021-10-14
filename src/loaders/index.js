import { ExpressServer } from "./server/expressServer.js";
import sequelize from "./sequelize/index.js";
import { port } from "../config/index.js";
import logger from "./logger/index.js";
import relations from "../models/relations.js";

const startLoader = async () => {
  try {
    await sequelize.authenticate();
    relations();
    sequelize.sync({ alter: true });
    logger.info("Database Loaded and Connected");

    const server = new ExpressServer();
    logger.info("Express Loaded");
    server.start();
    logger.info("#############################################");
    logger.info(`Server listening on port: ${port}`);
    logger.info("#############################################");
  } catch (err) {
    console.error("Unable to connect to the database!", err);
  }
};

export default startLoader;
