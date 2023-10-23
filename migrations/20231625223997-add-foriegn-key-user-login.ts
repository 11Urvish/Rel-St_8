'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('UserLogins', {
        type: 'foreign key',
        fields: ['iUserId'],
        references: {
          table: 'Users',
          field: 'iUserId'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('UserLogins', 'iUserId')
  }
};
