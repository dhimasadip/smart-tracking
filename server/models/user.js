'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Connection, { foreignKey: 'UserId', targetKey: 'id' })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Name can't be empty`
        },
        len: {
          args: [2,20],
          msg: 'Name at least 2-20 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          args: false,
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: false,
          msg: `Password can't be empty`
        },
        len: {
          args: [8,14],
          msg: 'Password at least 8-14 characters'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = bcrypt.hashSync(instance.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};