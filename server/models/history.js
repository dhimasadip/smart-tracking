'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      History.belongsTo(models.Device)
    }
  };
  History.init({
    longitude: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: 'longitude can not be empty'
        }
      }
    },
    latitude: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: {
          msg: 'latitude can not be empty'
        }
      }
    },
    DeviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};