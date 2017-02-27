"use strict";

require("dotenv").config();

const express = require("express");
const api = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./error-handler");

require("../lib/sequelize-extensions");

api.use(morgan("combined"));
api.use(cors());
api.use(bodyParser.json());

api.use(errorHandler);

module.exports = api;
