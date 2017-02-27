"use strict";

const epilogueAuth = require("./epilogue-auth");

module.exports = (epilogue, models) => {
  epilogue.resource({
    model: models.AppSegment,
    endpoints: ["/app-segments", "/app-segments/:id"]
  })
    .all
    .auth(epilogueAuth);
}
