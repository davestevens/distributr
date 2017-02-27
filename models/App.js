"use strict";

module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define(
    "App",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      },
      identifier: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      },
      kind: {
        type: DataTypes.ENUM("android", "ios"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["android", "ios"]],
            msg: "is not valid"
          }
        }
      }
    },
    {
      classMethods: {
        associate: (models) => {
          App.belongsToMany(models.Segment, {
            as: "segments",
            through: {
              model: models.AppSegment,
              unique: true
            },
            foreignKey: "app_id",
            otherKey: "segment_id"
          });

          App.hasMany(models.Version, {
            as: "versions",
            foreignKey: "app_id"
          });
        }
      },
      tableName: "apps"
    }
  );

  return App;
}
