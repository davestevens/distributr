"use strict";

const models = require("../../../models");
const errors = require("../../../lib/errors");

module.exports = (req, res, next) => {
  models.Segment.findOneWithFail({
    where: {
      username: req.body.username,
      passphrase: req.body.passphrase
    }
  })
    .then(segment => res.json({ token: segment.buildToken() }))
    .catch(() => {
      return next(new errors.NotAuthorizedError("Incorrect login details"));
    });
}
