'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(700)
      },
      releaseDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      rating: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      genreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
            model : {
              tableName : 'Genres'
            },
            key : 'id'
          }
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
    await queryInterface.dropTable('Movies');
  }
};