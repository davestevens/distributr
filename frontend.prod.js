"use strict";

const express = require("express");
const path = require("path");

module.exports = (api) => {
  api.use("/static", express.static("static"));

  const admin = path.join(__dirname, "admin", "index.html");
  api.get("/admin*", (req, res) => res.sendFile(admin));

  const app = path.join(__dirname, "app", "index.html");
  api.get("/*", (req, res) => res.sendFile(app));
}
