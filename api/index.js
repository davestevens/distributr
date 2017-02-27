"use strict";

require("dotenv").config();

const express = require("express");
const api = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorHandler = require("./error-handler");

require("../lib/sequelize-extensions");

api.use(morgan("combined"));
api.use(cors());
api.use(bodyParser.json());
api.use(fileUpload());

api.use("/api/segments", require("./segments"));
api.use("/api/admin", require("./admin"));

api.use(errorHandler);

module.exports = api;
