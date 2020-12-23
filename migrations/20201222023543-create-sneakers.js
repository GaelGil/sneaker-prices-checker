'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Sneakers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sneakerName: {
        type: Sequelize.STRING
      },
      colorway: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.STRING
      },
      retailPrice: {
        type: Sequelize.INTEGER
      },
      stockXPrice: {
        type: Sequelize.INTEGER
      },
      goatPrice: {
        type: Sequelize.INTEGER
      },
      stadiumGoodsPrice: {
        type: Sequelize.INTEGER
      },
      flightClubPrice: {
        type: Sequelize.INTEGER
      },
      silhoutte: {
        type: Sequelize.STRING
      },
      styleID: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      popular: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Sneakers');
  }
};