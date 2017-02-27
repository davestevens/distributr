"use strict";

const models = require("../../models");
const path = require("path");

module.exports = (req, res, next) => {
  models.Version.findByIdWithFail(
    req.params.id,
    {
      include: [{ model: models.App, as: "app" }]
    }
  )
    .then(version => {
      const app = version.app;
      if (app.kind != "android") return res.sendStatus(400);
      res.sendFile(
        path.join(process.env.UPLOADS_DIRECTORY, version.filename)
      );
    })
    .catch(next);
}
