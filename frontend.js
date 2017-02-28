"use strict";

const env = process.env.NODE_ENV == "development" ? "dev" : "prod";
const frontend = require(`./frontend.${ env }.js`);

module.exports = (api) => {
  frontend(api);
}
