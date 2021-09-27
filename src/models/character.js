import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
import Movie from "./movie.js";
const { DataTypes } = pkg;

const Character = sequelize.define("characters", {
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  history: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
});

Character.belongsToMany(Movie, {
  through: "characterMovies",
  as: "movies",
  foreignKey: "characterId",
});

export default Character;
