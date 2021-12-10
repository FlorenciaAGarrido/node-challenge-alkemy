const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");
const Character = require("./characters");
const ContentType = require("./contentTypes");
const GenderType = require("./genderTypes");

const Movie = sequelize.define("Movie", {
  image: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(250),
    allowNull: false,
    unique: true,
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  calification: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

/*Movie.belongsToMany(Character, {
    through: "charactersMovies",
    as: "characters",
    foreignKey: "movieId"
  });*/

Movie.belongsTo(ContentType, {
  foreignKey: "contentTypeId",
  as: "contentType",
});

Movie.belongsTo(GenderType, {
  foreignKey: "genderTypeId",
  as: "genderType",
});

module.exports = Movie;
