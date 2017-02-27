"use strict";

const jwt = require("jsonwebtoken");
const errors = require("../lib/errors");
const models = require("../models");

module.exports = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) return next(new errors.NotAuthorizedError());

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) return next(new errors.NotAuthorizedError());
    return models.User.findByIdWithFail(decoded.id)
      .then(instance => {
        req.user = instance;
        req.scopes = decoded.scopes;
        next();
        return null;
      })
      .catch(() => next(new errors.NotAuthorizedError()))
  });
}
