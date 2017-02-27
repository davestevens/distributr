"use strict";

const express = require("express");
const router = express.Router();

router.get("/", require("./list"));
router.get("/:id", require("./show"));

module.exports = router;
