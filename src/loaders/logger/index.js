import winston from "winston";
import {log} from "../../config/index.js";

const transports = [];
transports.push(new winston.transports.Console());

const LoggerInstance = winston.createLogger({
  level: log.level,
  format: winston.format.simple(),
  transports,
});

export default LoggerInstance;
