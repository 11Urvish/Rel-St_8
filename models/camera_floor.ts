'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Camera_Floor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Camera_Floor.belongsTo(models.Camera, { foreignKey: 'iCameraId' });
      Camera_Floor.belongsTo(models.Floor, { foreignKey: 'iFloorId' });
    }
  }
  Camera_Floor.init({
    iCameraFloorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iFloorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Floor",
        key: "iFloorId",
      }
    },
    iCameraId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Camera",
        key: "iCameraId",
      }
    },
  }, {
    sequelize,
    modelName: 'Camera_Floor',
  });
  return Camera_Floor;
};