'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('adminLogin', {
      iAdminLoginId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      iAdminId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      vAccessToken: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      iDeviceType: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      iCreatedAt: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('adminLogin');
  }
};