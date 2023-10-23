'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class UserLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserLogin.belongsTo(models.User, { foreignKey: 'iUserId' });
    }
  }
  UserLogin.init({
    iUserLoginId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "iUserId",
      }
    },
    VAccessToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserLogin',
  });
  return UserLogin;
};

