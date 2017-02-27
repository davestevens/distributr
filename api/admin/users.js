"use strict";

const epilogueAuth = require("./epilogue-auth");

module.exports = (epilogue, models) => {
  epilogue.resource({
    model: models.User,
    endpoints: ["/users", "/users/:id"]
  })
    .all
    .auth(epilogueAuth);
}
