"use strict";

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config");
const path = require("path");

module.exports = (api) => {
  const compiler = webpack(config)
  api.use(
    webpackDevMiddleware(
      compiler,
      {
        noInfo: true,
        publicPath: config.output.publicPath
      }
    )
  );
  api.use(webpackHotMiddleware(compiler));

  const admin = path.join(__dirname, "admin", "index.html");
  api.get("/admin*", (req, res) => res.sendFile(admin));
}
