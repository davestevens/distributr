"use strict";

const models = require("../../models");

module.exports = (req, res, next) => {
  models.Version.findByIdWithFail(
    req.params.id,
    {
      include: [{ model: models.App, as: "app" }]
    }
  )
    .then(version => {
      const app = version.app;
      if (app.kind != "ios") return res.sendStatus(400);

      res.set("Content-Type", "text/xml");
      res.render("plist", {
        url: `https://${ req.headers.host }/api/versions/${ version.id }.ipa`,
        identifier: app.identifier,
        version: version.number,
        title: app.name
      });
    })
    .catch(next);
}
