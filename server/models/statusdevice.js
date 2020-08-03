'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StatusDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StatusDevice.init({
    deviceSerial: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Device Serial can't be empty`
        }
      }
    },
    statusDevice: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Status device can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'StatusDevice',
  });
  return StatusDevice;
};