'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class UserDevice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserDevice.belongsTo(models.User)
      UserDevice.hasOne(models.Device)
    }
  };
  UserDevice.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: DataTypes.INTEGER,
    DeviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserDevice',
  });
  return UserDevice;
};