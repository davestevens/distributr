"use strict";

const path = require("path");

module.exports = (sequelize, DataTypes) => {
  const Version = sequelize.define(
    "Version",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      filename: {
        type: DataTypes.STRING
      },
      file: {
        type: DataTypes.VIRTUAL
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "is required"
          }
        }
      },
      app_id: {
        type: DataTypes.UUID
      }
    },
    {
      classMethods: {
        associate: (models) => {
          Version.belongsTo(models.App, {
            as: "app",
            foreignKey: "app_id",
            onDelete: "cascade"
          });
        }
      },
      hooks: {
        beforeCreate: (version) => {
          const file = version.file;
          if (!file) return;
          const filename = `${ version.id }${ path.extname(file.name) }`;
          const dest = path.join(process.env.UPLOADS_DIRECTORY, filename);
          return new Promise((resolve, reject) => {
            file.mv(dest, (error) => {
              if (error) return reject(error);
              version.setDataValue("filename", filename);
              resolve();
            });
          });
        }
      },
      tableName: "versions"
    }
  );

  return Version;
}
