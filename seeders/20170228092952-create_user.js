"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [{
      id: "00000000-0000-0000-0000-000000000000",
      email: "user@example.com",
      passwordDigest: "$2a$10$bgB6c9Rcidpv6PnYokoCmeQzmRzkSec5hyv1mQSovHckUP6hfgLDO"
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", [{
      email: "user@example.com"
    }]);
  }
};
