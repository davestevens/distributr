"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      "apps_segments",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        app_id: {
          type: Sequelize.UUID,
          allowNull: false
        },
        segment_id: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        }
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable("apps_segments");
  }
};
