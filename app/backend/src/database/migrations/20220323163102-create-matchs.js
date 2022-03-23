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
        type: Sequelize.INTEGER,
        field: 'home_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
        refererences: { model: 'Clubs', key: 'id' },
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals', 
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        field: 'away_team',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', 
        refererences: { model: 'Clubs', key: 'id' },
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.INTEGER,
        field: 'in_progress',
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Matchs');
  }
};