"use strict";

const ExtendableError = require("./ExtendableError");

class ForbiddenError extends ExtendableError {
  constructor(message, extra) {
    super(message);
    this.statusCode = 403;
    this.extra = extra;
  }
}

module.exports = ForbiddenError;
