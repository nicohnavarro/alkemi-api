import pkg from "sequelize";
import sequelize from "../loaders/sequelize/index.js";
import { ADMIN_ROLE, USER_ROLE } from "../constants/index.js";
const { DataTypes } = pkg;
const User = sequelize.define(
  "users",
  {
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: [ADMIN_ROLE, USER_ROLE],
      defaultValue: USER_ROLE,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["username", "email"],
      },
    ],
  }
);

export default User;
