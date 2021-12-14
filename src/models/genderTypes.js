const { getRounds } = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const GenderType = sequelize.define(
  "GenderType",
  {
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = GenderType;

const Movie = require("./movies");
GenderType.hasMany(Movie, {
  foreignKey: "genderTypeId",
  sourceKey: "id",
});
