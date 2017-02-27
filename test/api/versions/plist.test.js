"use strict";

import api from "../../../api";
import models from "../../../models";
import request from "supertest";

describe("API: Versions", () => {
  describe("GET /api/versions/:id.plist", () => {
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

        it("returns 400: Bad Request", (done) => {
          request(api)
            .get(`/api/versions/${ version.id }.plist`)
            .expect(400, done);
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

        it("returns 200: OK", (done) => {
          request(api)
            .get(`/api/versions/${ version.id }.plist`)
            .expect(200)
            .end((error, response) => {
              if (error) return done(error);

              expect(response.text).to.contain('<?xml version="1.0" encoding="utf-8" ?>');
              expect(response.text).to.contain('<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">');
              done();
            });
        });
      });
    });

    context("when the Version does not exist", () => {
      it("returns 404: Not Found", (done) => {
        request(api)
          .get("/api/versions/666.plist")
          .expect(404, done);
      })
    });
  });
});
