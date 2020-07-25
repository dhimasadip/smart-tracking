'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(5)

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Device)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please fill the name'
        }, notEmpty : {
          msg: 'Please fill the name'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Please fill the email'
        }, notEmpty : {
          msg: 'Please fill the email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 10],
          msg: `Password must be between 6 & 10 characters`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, salt)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};