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
      tableName: "apps"
    }
  );

  return App;
}
