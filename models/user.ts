'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Camera, { foreignKey: 'iUserId' });
      User.hasMany(models.Floor,{ foreignKey: 'iUserId' });
      User.hasMany(models.UserLogin, { foreignKey: 'iUserId' });
    }
  }
  User.init({
    iUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vFullName: DataTypes.STRING,
    iPhoneNo: DataTypes.INTEGER,
    vEmail: DataTypes.STRING,
    vPassword: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};