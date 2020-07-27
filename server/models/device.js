'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Device.hasOne(models.Connection, { foreignKey: 'DeviceId', targetKey: 'id' })
      Device.hasMany(models.History, { targetKey: 'DeviceId', targetKey: 'id' })
      Device.hasMany(models.Buzzer, { targetKey: 'DeviceId', targetKey: 'id' })
    }
  };
  Device.init({
    deviceSerial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Device',
  });
  return Device;
};