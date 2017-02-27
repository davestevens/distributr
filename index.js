"use strict";

require("dotenv").config();

const api = require("./api");
const server = require("http").Server(api);

server.listen(process.env.PORT, process.env.ADDRESS, function(error) {
  if (error) return console.error(error)
  const address = this.address().address,
        port = this.address().port;
  console.info("==> 🌎  http://%s:%s/", address, port);
});
