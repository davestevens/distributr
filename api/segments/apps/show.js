"use strict";

const models = require("../../../models");
const errors = require("../../../lib/errors");

module.exports = (req, res, next) => {
  models.App.findByIdWithFail(
    req.params.id,
    {
      include: [{ model: models.Version, as: "versions" }],
      order: "versions.createdAt DESC"
    }
  )
    .then(app => {
      return app.hasSegment(req.segment)
        .then(hasSegment => {
          if (!hasSegment) {
            return next(new errors.NotFoundError("App not found"));
          }
          res.json(app);
        });
    })
    .catch(next);
}
