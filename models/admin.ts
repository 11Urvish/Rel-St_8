'use strict';
// const { Model } = require('sequelize');
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.AdminLogin, { foreignKey: 'iAdminId'});

    }
  }
  Admin.init(
    {
      iAdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      vName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vUserName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vEmail: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      vPhone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      vPassword: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bIsDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      iStatus: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      iCreatedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      iLastLoginAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      iUpdatedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      iDeletedAt: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, 
    {
        sequelize,
        modelName: "Admin",
        tableName: "admin",
        timestamps: false,
    }
  );
  return Admin;
};