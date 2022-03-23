'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Matchs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeam: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      homeTeamGoals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awayTeam: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awayTeamGoals: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matchs');
  }
};