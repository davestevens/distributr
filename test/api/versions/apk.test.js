"use strict";

import api from "../../../api";
import models from "../../../models";
import request from "supertest";
import mock from "mock-fs";

describe("API: Versions", () => {
  describe("GET /api/versions/:id.apk", () => {
    context("when the Version exists", () => {
      const filename = "file.apk"
      const mockUploadsDirectory = "/path/to/uploads";
      let uploadsDirectory;

      before(() => {
        mock({
          [mockUploadsDirectory]: {
            [filename]: "example content"
          }
        });
        uploadsDirectory = process.env.UPLOADS_DIRECTORY;
        process.env.UPLOADS_DIRECTORY = mockUploadsDirectory;
      });

      after(() => {
        mock.restore();
        process.env.UPLOADS_DIRECTORY = uploadsDirectory;
      });

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
                filename: filename,
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
            .get(`/api/versions/${ version.id }.apk`)
            .expect(200, done);
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

        it("returns 400: Bad Request", (done) => {
          request(api)
            .get(`/api/versions/${ version.id }.apk`)
            .expect(400, done);
        });
      });
    });

    context("when the Version does not exist", () => {
      it("returns 404: Not Found", (done) => {
        request(api)
          .get("/api/versions/666.apk")
          .expect(404, done);
      })
    });
  });
});
