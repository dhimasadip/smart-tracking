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
      History.belongsTo(models.Device, { foreignKey: 'DeviceId', targetKey: 'id' })
    }
  };
  History.init({
    DeviceId: DataTypes.INTEGER,
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: false,
          msg: `latitude can't be empty`
        },
      }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: false,
          msg: `longitude can't be empty`
        },
      }
    }
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};