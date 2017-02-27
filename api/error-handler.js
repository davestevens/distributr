"use strict";

module.exports = (error, req, res, next) => {
  if (error && error.statusCode) {
    res.status(error.statusCode).json({
      name: error.name,
      message: error.message
    });
  }
  else if (error && error.name == "SequelizeValidationError") {
    let errors = {};
    error.errors.forEach((error) => {
      errors[error.path] = errors[error.path] || [];
      errors[error.path].push(error.message);
    });
    res.status(400).json({ errors: errors });
  }
  else {
    next(error);
  }
}
