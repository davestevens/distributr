"use strict";

const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const Segment = sequelize.define(
    "Segment",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      },
      passphrase: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      }
    },
    {
      classMethods: {
        associate: (models) => {
          Segment.belongsToMany(models.App, {
            as: "apps",
            through: {
              model: models.AppSegment,
              unique: true
            },
            foreignKey: "segment_id",
            otherKey: "app_id"
          });
        }
      },
      instanceMethods: {
        buildToken: function() {
          const scopes = ["segment"];

          return jwt.sign(
            { scopes: scopes, id: this.id },
            process.env.SECRET
          )
        }
      },
      tableName: "segments",
      validate: {
        usernameRegistered: function(next) {
          Segment.find({ where: { username: this.username } })
            .then(segment => {
              const anotherSegment = segment && segment.id != this.id;
              next(anotherSegment ? "is already in use" : null)
            });
        }
      }
    }
  );

  return Segment;
}
