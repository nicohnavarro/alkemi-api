import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
import Character from "./character.js";
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

Movie.belongsToMany(Character, {
  through: "characterMovies",
  as: "character",
  foreignKey: "movieId",
});

Movie.belongsTo(GenderType, {
  foreignKey: "genderTypeId",
  as: "genderType",
});

Movie.belongsTo(ContentType, {
  foreignKey: "contentTypeId",
  as: "contentType",
});

export default Movie;
