"use strict";

const express = require("express");
const router = express.Router();
const isSegment = require("../is-segment");

router.use("/session", require("./session"));
router.use("/apps", isSegment, require("./apps"));

module.exports = router;
