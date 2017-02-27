"use strict";

module.exports = (req, res, next) => {
  req.segment.getApps()
    .then(apps => res.json(apps))
    .catch(next);
}
