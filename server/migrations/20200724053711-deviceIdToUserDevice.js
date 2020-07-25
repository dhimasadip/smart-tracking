'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Devices', 'UserId', Sequelize.INTEGER );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Devices', 'UserId');
  }
};
