"use strict";

import api from "../../../../api";
import models from "../../../../models";
import request from "supertest";

describe("API: Apps", () => {
  describe("GET /api/segments/apps", () => {
    it("requires authentication", (done) => {
      request(api)
        .get("/api/segments/apps")
        .expect(401, done);
    });

    context("as a Segment", () => {
      let segment, apps;

      before(done => {
        models.Segment.create({
          username: "username",
          passphrase: "passphrase"
        })
          .then(s => {
            segment = s;
            return models.App.bulkCreate([
              {
                name: "App 1",
                description: "Desc",
                identifier: "com.identifier",
                kind: "android"
              },
              {
                name: "App 2",
                description: "Desc",
                identifier: "com.identifier",
                kind: "android"
              },
              {
                name: "App 3",
                description: "Desc",
                identifier: "com.identifier",
                kind: "android"
              }
            ])
              .then(result => {
                apps = result;
                return Promise.all([
                  segment.addApp(apps[0]),
                  segment.addApp(apps[2])
                ]);
              });
          })
          .then(() => done())
          .catch(done);
      });

      after(done => {
        Promise.all([apps.map(app => app.destroy())])
          .then(() => segment.destroy())
          .then(() => done())
          .catch(done);
      });

      it("returns all of the Segments Apps", (done) => {
        request(api)
          .get("/api/segments/apps")
          .set("x-access-token", segment.buildToken())
         .expect(200)
          .end((error, response) => {
            if (error) return done(error);

            expect(response.body).to.have.length(2);

            done();
          });
      });
    });

    context("as a User", () => {
      let user;

      before(done => {
        models.User.create({ email: "test@example.com", password: "12345678" })
          .then(u => user = u)
          .then(() => done())
          .catch(done);
      });

      after(done => {
        user.destroy()
          .then(() => done())
          .catch(done);
      });

      it("returns 401: Not Authorised", (done) => {
        request(api)
          .get("/api/segments/apps")
          .set("x-access-token", user.buildToken())
          .expect(401, done);
      });
    });
  });
});
