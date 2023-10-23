'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('adminLogin', {
        type: 'foreign key',
        fields: ['iAdminId'],
        references: {
          table: 'admin',
          field: 'iAdminId'
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('adminLogin', 'iAdminId')
  }
};
