"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable(
      "users",
      {
        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        passwordDigest: {
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
    return queryInterface.dropTable("users");
  }
};
