'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Cameras', {
        type: 'foreign key',
        fields: ['iUserId'],
        references: {
          table: 'Users',
          field: 'iUserId'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Cameras', 'iUserId')
  }
};
