"use strict";

const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    "admin": [
      "babel-polyfill",
      "whatwg-fetch",
      "./admin/index.jsx"
    ],
    "app": [
      "babel-polyfill",
      "whatwg-fetch",
      "./app/index.jsx"
    ]
  },
  output: {
    path: path.join(__dirname, "static"),
    filename: "[name].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
      }
    })
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
