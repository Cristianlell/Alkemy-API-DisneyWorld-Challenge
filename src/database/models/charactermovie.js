'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CharacterMovie extends Model {
   
    static associate(models) {
      


    }
  };
  CharacterMovie.init({
    characterId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CharacterMovie',
 
  });
  return CharacterMovie;
};