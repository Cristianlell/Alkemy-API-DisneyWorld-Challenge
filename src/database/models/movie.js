'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {

    static associate(models) {
      Movie.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "genreId",
        onDelete : 'cascade',
        onUpdate : 'cascade'
      });
      Movie.belongsToMany(models.Character, {
        as: "characters",
        through : "CharacterMovies",
        foreignKey : "movieId",
        otherKey : "characterId",
        onDelete : 'cascade',
        onUpdate : 'cascade'
      });
    }
  };
  Movie.init({
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    rating: DataTypes.DECIMAL,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};