const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Movie = require("./movies");
const Character = require("./characters");
const ContentType = require("./contentTypes");

const GenderType = sequelize.define("GenderType", {
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

GenderType.hasMany(Movie, { as: "movies" });

module.exports = GenderType;
