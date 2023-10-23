'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Floors', {
        type: 'foreign key',
        fields: ['iUserId'],
        references: {
          table: 'Users',
          field: 'iUserId'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Floors', 'iUserId')
  }
};
