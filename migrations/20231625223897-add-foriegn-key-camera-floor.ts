'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Camera_Floors', {
        type: 'foreign key',
        fields: ['iCameraId'],
        references: {
          table: 'Cameras',
          field: 'iCameraId'
        },
    });
    await queryInterface.addConstraint('Camera_Floors', {
      type: 'foreign key',
      fields: ['iFloorId'],
      references: {
        table: 'Floors',
        field: 'iFloorId'
      },
  });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Camera_Floors', 'iCameraId')
    await queryInterface.removeColumn('Camera_Floors', 'iFloorId')
  }
};
