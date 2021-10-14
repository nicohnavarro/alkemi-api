import sequelize from "../loaders/sequelize/index.js";

const CharacterMovie = sequelize.define(
  "characterMovies",
  {},
  { timestamps: false }
);

export default CharacterMovie;
