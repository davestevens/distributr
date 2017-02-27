"use strict";

import api from "../../../api";
import models from "../../../models";
import request from "supertest";

describe("API: Versions", () => {
  describe("GET /api/versions/:id", () => {
    context("when the Version exists", () => {
      context("when the Version's App is Android", () => {
        let app, version;

        before(done => {
          models.App.create({
            name: "App",
            description: "Description",
            identifier: "com.identifier",
            kind: "android"
          })
            .then(a => {
              app = a;
              return models.Version.create({
                number: "v0.0.1",
                notes: "Version notes",
                app_id: app.id
              })
                .then(v => version = v)
            })
            .then(() => done())
            .catch(done);
        });

        after(done => {
          app.destroy()
            .then(() => done())
            .catch(done);
        });

        it("redirects to .apk", (done) => {
          request(api)
            .get(`/api/versions/${ version.id }`)
            .expect(301)
            .end((error, response) => {
              if (error) return done(error);

              const headers = response.headers;
              expect(headers.location)
                .to.equal(`/api/versions/${ version.id }.apk`);

              done();
            });
        });
      });

      context("when the Version's App is iOS", () => {
        let app, version;

        before(done => {
          models.App.create({
            name: "App",
            description: "Description",
            identifier: "com.identifier",
            kind: "ios"
          })
            .then(a => {
              app = a;
              return models.Version.create({
                number: "v0.0.1",
                notes: "Version notes",
                app_id: app.id
              })
                .then(v => version = v)
            })
            .then(() => done())
            .catch(done);
        });

        after(done => {
          app.destroy()
            .then(() => done())
            .catch(done);
        });

        it("redirects to .plist", (done) => {
          request(api)
            .get(`/api/versions/${ version.id }`)
            .expect(301)
            .end((error, response) => {
              if (error) return done(error);

              const headers = response.headers;
              expect(headers.location)
                .to.contain("itms-services://?action=download-manifest&url=");
              expect(headers.location)
                .to.contain(`/api/versions/${ version.id }.plist`);

              done();
            });
        });
      });
    });

    context("when the Version does not exist", () => {
      it("returns 404: Not Found", (done) => {
        request(api)
          .get("/api/versions/666")
          .expect(404, done);
      })
    });
  });
});
