"use strict";

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "must be an email address"
          }
        }
      },
      passwordDigest: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.VIRTUAL,
        validate: {
          notEmpty: {
            msg: "is required"
          },
          passwordLength: function (value) {
            if (value.length >= 8) return;
            throw new Error("must be 8 characters or longer")
          }
        },
        set: function (value) {
          this.setDataValue("password", value);
          this.setDataValue("passwordDigest", bcrypt.hashSync(value, 10));
        }
      }
    },
    {
      instanceMethods: {
        authenticate: function(value) {
          if (bcrypt.compareSync(value, this.passwordDigest))
            return this;
          else
            return false;
        },
        toJSON: function() {
          let values = this.dataValues;
          delete values.password;
          delete values.passwordDigest;
          return values;
        }
      },
      tableName: "users",
      validate: {
        emailRegistered: function(next) {
          User.find({ where: { email: this.email } })
            .then(user => {
              const anotherUser = user && user.id != this.id;
              next(anotherUser ? "is already registered" : null)
            });
        }
      }
    }
  );

  return User;
}
