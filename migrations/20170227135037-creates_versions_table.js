"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      "versions",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        filename: {
          type: Sequelize.STRING
        },
        notes: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        number: {
          type: Sequelize.STRING,
          allowNull: false
        },
        app_id: {
          type: Sequelize.UUID,
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
    return queryInterface.dropTable("versions");
  }
};
