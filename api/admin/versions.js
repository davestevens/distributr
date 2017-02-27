"use strict";

const epilogueAuth = require("./epilogue-auth");

module.exports = (epilogue, models) => {
  const resource = epilogue.resource({
    model: models.Version,
    endpoints: ["/versions", "/versions/:id"]
  });

  resource
    .all
    .auth(epilogueAuth);

  resource.create.write.before((req, res, context) => {
    req.body.file = (req.files || {}).file;
    return context.continue;
  });
}
