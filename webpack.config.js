"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    "admin": [
      "webpack-hot-middleware/client?reload=true",
      "./admin/index.jsx"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/static/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [ "babel-loader" ],
      exclude: /node_modules/,
      include: __dirname
    }]
  }
}
