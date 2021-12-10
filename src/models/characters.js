const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Movie = require("./movies");
const ContentType = require("./contentTypes");
const GenderType = require("./genderTypes");

const Character = sequelize.define("Character", {
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
  history: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
  weigth: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

/*Character.belongsToMany(Movies, {
    through: "charactersMovies",
    as: "movies",
    foreignKey: "charactersId"
  });*/

module.exports = Character;
