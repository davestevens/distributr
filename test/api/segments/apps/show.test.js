"use strict";

import api from "../../../../api";
import models from "../../../../models";
import request from "supertest";

describe("API: Apps", () => {
  describe("GET /api/segments/apps/:id", () => {
    it("requires authentication", (done) => {
      request(api)
        .get("/api/segments/apps/:id")
        .expect(401, done);
    });

    context("as a Segment", () => {
      let segment;

      before(done => {
        models.Segment.create({
          username: "username",
          passphrase: "passphrase"
        })
          .then(s => segment = s)
          .then(() => done())
          .catch(done);
      });

      after(done => {
        segment.destroy()
          .then(() => done())
          .catch(done);
      });

      context("with access to the App", () => {
        let app;

        before(done => {
          models.App.create({
            name: "App",
            description: "Desc",
            identifier: "com.identifier",
            kind: "android"
          })
            .then(a => {
              app = a
              return app.addSegment(segment);
            })
            .then(() => done())
            .catch(done);
        });

        after(done => {
          app.destroy()
            .then(() => done())
            .catch(done);
        });

        it("returns the App details", (done) => {
          request(api)
            .get(`/api/segments/apps/${ app.id }`)
            .set("x-access-token", segment.buildToken())
            .expect(200)
            .end((error, response) => {
              if (error) return done(error);

              expect(response.body).to.include.keys(
                "description", "id", "identifier", "kind", "name", "versions"
              );

              done();
            });
        });
      });

      context("with no access to the App", () => {
        let app;

        before(done => {
          models.App.create({
            name: "App",
            description: "Desc",
            identifier: "com.identifier",
            kind: "android"
          })
            .then(a => app = a)
            .then(() => done())
            .catch(done);
        });

        after(done => {
          app.destroy()
            .then(() => done())
            .catch(done);
        });

        it("returns 404: Not Found", (done) => {
          request(api)
            .get(`/api/segments/apps/${ app.id }`)
            .set("x-access-token", segment.buildToken())
            .expect(404, done);
        });
      });
    });

    context("as a User", () => {
      let user, app;

      before(done => {
        models.User.create({ email: "test@example.com", password: "12345678" })
          .then(u => {
            user = u;
            return models.App.create({
              name: "App",
              description: "Desc",
              identifier: "com.identifier",
              kind: "android"
            })
              .then(a => app = a);
          })
          .then(() => done())
          .catch(done);
      });

      after(done => {
        Promise.all([user.destroy(), app.destroy()])
          .then(() => done())
          .catch(done);
      });

      it("returns 401: Not Authorised", (done) => {
        request(api)
          .get(`/api/segments/apps/${ app.id }`)
          .set("x-access-token", user.buildToken())
          .expect(401, done);
      });
    });
  });
});
