'use strict';
import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class Floor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Floor.hasMany(models.Camera_Floor, { foreignKey: 'iFloorId' });
      Floor.belongsTo(models.User, { foreignKey: 'iUserId' });
    }
  }
  Floor.init({
    iFloorId: {
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
    vName: {
      type:  DataTypes.STRING,
    allowNull: false}
    
  }, {
    sequelize,
    modelName: 'Floor',
  });
  return Floor;
};