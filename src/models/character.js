import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
const { DataTypes } = pkg;

const Character = sequelize.define("characters", {
  image: {
    type: DataTypes.STRING(250),
    allowNull: true,
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

export default Character;


