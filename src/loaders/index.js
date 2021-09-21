const ExpressServer = require('./server/expressServer');
const mongooseLoader = require('./mongoose');
const config = require('../config');
const logger= require('./logger');

const startServer = async ()=>{

  await mongooseLoader();
  logger.info('Database Loaded and Connected');

  const server = new ExpressServer();
  logger.info('Express Loaded');
  server.start();
  logger.info('#############################################');
  logger.info(`Server listening on port: ${config.port}`);
  logger.info('#############################################');
}
 
module.exports = startServer;
