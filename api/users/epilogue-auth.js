"use strict";

const isUser = require("../is-user");

module.exports = (req, res, context) => {
  return new Promise((resolve, reject) => {
    isUser(req, res, (error) => {
      if (error) {
        res.status(error.statusCode).send({ message: error.message });
        resolve(context.stop);
      }
      else {
        resolve(context.continue);
      }
    });
  });
}
