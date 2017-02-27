"use strict";

const ExtendableError = require("./ExtendableError");

class NotAuthorizedError extends ExtendableError {
  constructor(message, extra) {
    super(message);
    this.statusCode = 401;
    this.extra = extra;
  }
}

module.exports = NotAuthorizedError;
