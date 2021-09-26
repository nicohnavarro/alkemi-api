import { Sequelize } from "sequelize";
import { database } from "../../config/index.js";

const sequelize = new Sequelize(
  database.name,
  database.username,
  database.password,
  {
    host: database.host,
    dialect: "mysql",
  }
);

export default sequelize;
