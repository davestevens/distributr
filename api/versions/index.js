"use strict";

const express = require("express");
const router = express.Router();

router.get("/:id.plist", require("./plist"));
router.get("/:id.ipa", require("./ipa"));
router.get("/:id.apk", require("./apk"));
router.get("/:id", require("./show"));

module.exports = router;
