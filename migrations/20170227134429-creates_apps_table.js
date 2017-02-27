"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      "apps",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false
        },
        identifier: {
          type: Sequelize.STRING,
          allowNull: false
        },
        kind: {
          type: Sequelize.ENUM("android", "ios"),
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
    return queryInterface.dropTable("apps");
  }
};
