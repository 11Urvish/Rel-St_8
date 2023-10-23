'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('admin', {
      iAdminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      vUserName: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      vEmail: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      vPhone: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      vPassword: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      bIsDelete: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      iStatus: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iCreatedAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iLastLoginAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iUpdatedAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      iDeletedAt: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('admin');
  }
};