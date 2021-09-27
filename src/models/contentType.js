import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
import Movie from "./movie.js";
const { DataTypes } = pkg;

const ContentType = sequelize.define("contentTypes", {
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

ContentType.hasMany(require('./movies'), {
  as: 'movies',
  foreignKey: 'contentTypeId'
});

export default ContentType;
