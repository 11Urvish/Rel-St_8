'use strict';
// const { Model } = require('sequelize');
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
  class AdminLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdminLogin.belongsTo(models.Admin, {foreignKey: 'iAdminId'});
    }
  }
  AdminLogin.init(
    {
      iAdminLoginId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      iAdminId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Admin",
          key: "iAdminId",
        }
      },
      vAccessToken: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      iDeviceType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      iCreatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }, 
    {
        sequelize,
        modelName: "AdminLogin",
        tableName: "adminLogin",
        timestamps: false,
    }
  );
  return AdminLogin;
};