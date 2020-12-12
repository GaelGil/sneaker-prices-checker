'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sneakers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sneakers.init({
    sneakerName: DataTypes.STRING,
    colorway: DataTypes.STRING,
    releaseDate: DataTypes.STRING,
    retailPrice: DataTypes.INTEGER,
    stockXPrice: DataTypes.INTEGER,
    goatPrice: DataTypes.INTEGER,
    stadiumGoodsPrice: DataTypes.INTEGER,
    flightClubPrice: DataTypes.INTEGER,
    silhoutte: DataTypes.STRING,
    styleID: DataTypes.INTEGER,
    brand: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sneakers',
  });
  return Sneakers;
};