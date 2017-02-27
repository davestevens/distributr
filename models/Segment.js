"use strict";

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
