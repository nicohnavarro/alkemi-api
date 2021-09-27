import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
const { DataTypes } = pkg;

const CharacterMovie = sequelize.define(
  "characterMovies",
  {},
  { timestamps: false }
);

export default CharacterMovie;
