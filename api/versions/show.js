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
      switch(app.kind) {
      case "android":
        return res.redirect(301, `/api/versions/${ version.id }.apk`);
      case "ios":
        return res.redirect(
          301,
          `itms-services://?action=download-manifest&url=https://${ req.headers.host }/api/versions/${ version.id }.plist`
        );
      default:
        return res.sendStatus(404);
      }
    })
    .catch(next);
}
