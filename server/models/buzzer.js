'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buzzer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Buzzer.belongsTo(models.Device, { foreignKey: 'DeviceId', targetKey: 'id' })
    }
  };
  Buzzer.init({
    DeviceId: DataTypes.INTEGER,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Buzzer',
  });
  return Buzzer;
};