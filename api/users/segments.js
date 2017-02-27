"use strict";

const epilogueAuth = require("./epilogue-auth");

module.exports = (epilogue, models) => {
  epilogue.resource({
    model: models.Segment,
    endpoints: ["/segments", "/segments/:id"]
  })
    .all
    .auth(epilogueAuth);
}
