"use strict";

const ExtendableError = require("./ExtendableError");

class NotFoundError extends ExtendableError {
  constructor(message, extra) {
    super(message);
    this.statusCode = 404;
    this.extra = extra;
  }
}

module.exports = NotFoundError;
