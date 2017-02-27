"use strict";


module.exports = (sequelize, DataTypes) => {
  const AppSegment = sequelize.define(
    "AppSegment",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      app_id: {
        type: DataTypes.UUID,
        allowNull: false
      },
      segment_id: {
        type: DataTypes.UUID,
        allowNull: false
      }
    },
    {
      classMethods: {
        associate: (models) => {
          AppSegment.belongsTo(models.App, {
            as: "app",
            foreignKey: "app_id",
            onDelete: "cascade"
          });

          AppSegment.belongsTo(models.Segment, {
            as: "segment",
            foreignKey: "segment_id",
            onDelete: "cascade"
          });
        }
      },
      tableName: "apps_segments",
      validate: {
        belongsToApp: function(next) {
          sequelize.models.App.findById(this.app_id)
            .then(app => next(app ? null : "must be a valid App"));
        },
        belongsToSegment: function(next) {
          sequelize.models.Segment.findById(this.segment_id)
            .then(segment => next(segment ? null : "must be a valid Segment"));
        },
        isUnique: function(next) {
          AppSegment.find({
            where: { app_id: this.app_id, segment_id: this.segment_id }
          })
            .then(appSegment => {
              const anotherAppSegment = appSegment && appSegment.id != this.id;
              next(anotherAppSegment ? "must be unique" : null)
            });
        }
      }
    }
  );

  return AppSegment;
}
