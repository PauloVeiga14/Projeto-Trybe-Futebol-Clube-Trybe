'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClubName: {
        type: Sequelize.STRING,
        field: 'club_name',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clubs');
  }
};