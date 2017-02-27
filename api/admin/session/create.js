"use strict";

const models = require("../../../models");
const errors = require("../../../lib/errors");

module.exports = (req, res, next) => {
  models.User.findOneWithFail({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user.authenticate(req.body.password)) {
        return next(new errors.NotAuthorizedError("Incorrect login details"));
      }

      res.json({ token: user.buildToken() });
    })
    .catch(() => {
      return next(new errors.NotAuthorizedError("Incorrect login details"));
    });
}
