"use strict";

const express = require("express");
const router = express.Router();
const epilogue = require("epilogue");
const models = require("../../models");
const apps = require("./apps");
const segments = require("./segments");
const appSegments = require("./app-segments");
const users = require("./users");
const versions = require("./versions");

router.use("/session", require("./session"));

epilogue.initialize({
  app: router,
  sequelize: models
});

apps(epilogue, models);
segments(epilogue, models);
appSegments(epilogue, models);
users(epilogue, models);
versions(epilogue, models);

module.exports = router;
