const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const User = sequelize.define(
  "Users",
  {
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {}
);

module.exports = User;
