'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Camera extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Camera.hasMany(models.Camera_Floor, { foreignKey: 'iCameraId' });
      Camera.belongsTo(models.User, { foreignKey: 'iUserId' });
    }
  }
  Camera.init({
    iCameraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vName: {
      type:  DataTypes.STRING,
    allowNull: false},
    iUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "iUserId",
      }
    },
    vType: {type:  DataTypes.STRING,
    allowNull: false},
    vDetail:  {type:  DataTypes.STRING,
      allowNull: false},
  }, {
    sequelize,
    modelName: 'Camera',
  });
  return Camera;
};