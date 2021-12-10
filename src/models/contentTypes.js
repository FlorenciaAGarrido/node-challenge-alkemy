const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Movie = require("./movies");
const Character = require("./characters");
const GenderType = require("./genderTypes");
const { models } = require("mongoose");

const ContentType = sequelize.define("ContentType", {
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

ContentType.associate = (models) => {
  ContentType.hasMany(models.Movie, {
    as: "movie",
    foreignKey: "contentTypeId",
  });
};

module.exports = ContentType;
