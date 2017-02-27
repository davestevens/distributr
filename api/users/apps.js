"use strict";

const epilogueAuth = require("./epilogue-auth");

module.exports = (epilogue, models) => {
  epilogue.resource({
    model: models.App,
    endpoints: ["/apps", "/apps/:id"]
  })
    .all
    .auth(epilogueAuth);
}
