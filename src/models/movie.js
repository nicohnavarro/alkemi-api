import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
import ContentType from "./contentType.js";
import GenderType from "./genderType.js";
const { DataTypes } = pkg;

const Movie = sequelize.define("movies", {
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default Movie;

Movie.belongsTo(GenderType, {
  foreignKey: "genderTypeId",
  as: "genderType",
  targetKey: "id",
});

Movie.belongsTo(ContentType, {
  foreignKey: "contentTypeId",
  as: "contentType",
  targetKey: "id",
});
