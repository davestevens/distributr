"use strict";

const epilogueAuth = require("./epilogue-auth");

module.exports = (epilogue, models) => {
  epilogue.resource({
    model: models.Version,
    endpoints: ["/versions", "/versions/:id"]
  })
    .all
    .auth(epilogueAuth);
}
