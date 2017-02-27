"use strict";

const Sequelize = require("sequelize");
const errors = require("./errors");
const Model = Sequelize.prototype.Model;

Model.prototype.findOneWithFail = function(options) {
  options = options || {};
  return this.findOne(options)
    .then(model => {
      if (model) return model;
      throw new errors.NotFoundError(
        `${ this.name } not found`,
        options
      );
    });
}

Model.prototype.findByIdWithFail = function(param, options) {
  options = options || {};
  return this.findById(param, options)
    .then(model => {
      if (model) return model;
      throw new errors.NotFoundError(
        `${ this.name } with id ${ param } not found`,
        options
      );
    });
}
