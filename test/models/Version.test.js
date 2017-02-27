"use strict";

import models from "../../models";

describe("Models: Version", () => {
  const Version = models.Version;

  describe("Validations", () => {
    describe("notes", () => {
      it("is required", (done) => {
        const version = Version.build({
          notes: "",
          number: "v0.0.0"
        });

        version.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });
    });

    describe("number", () => {
      it("is required", (done) => {
        const version = Version.build({
          notes: "Notes",
          number: ""
        });

        version.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });
    });
  });

  describe("Associations", () => {
    describe("App", () => {
      let version, app;

      before(done => {
        Version.create({ notes: "Notes", number: "v0.0.0" })
          .then(v => {
            version = v;
            return models.App.create({
              name: "App",
              description: "Desc",
              identifier: "com.identifier",
              kind: "android"
            })
              .then(a => {
                app = a;
                return version.setApp(app);
              });
          })
          .then(() => done())
          .catch(done);
      });

      after(done => {
        app.destroy()
          .then(() => done())
          .catch(done);
      });

      it("belongs to an App", (done) => {
        version.getApp()
          .then(associatedApp => {
            expect(associatedApp.id).to.equal(app.id);
            done();
          })
          .catch(done);
      });
    });
  });

  describe("Attached file", () => {
    const mockUploadsDirectory = "/path/to/uploads";
    let uploadsDirectory;

    before(() => {
      uploadsDirectory = process.env.UPLOADS_DIRECTORY;
      process.env.UPLOADS_DIRECTORY = mockUploadsDirectory;
    });

    after(() => {
      process.env.UPLOADS_DIRECTORY = uploadsDirectory;
    });

    context("when created with a file", () => {
      it("moves a copy to the UPLOADS_DIRECTORY", (done) => {
        const file = {
          name: "test.apk",
          mv: (dest, callback) => callback(null)
        };
        const spy = sinon.spy(file, "mv");

        Version.create({
          number: "v1.0.0",
          notes: "Version 1",
          file: file
        })
          .then(version => {
            const expected = `${ version.id }.apk`;
            expect(version.filename).not.to.be.undefined;
            expect(version.filename).to.equal(expected);
            expect(spy).to.have.been.calledWithMatch(
              `${ mockUploadsDirectory }/${ expected }`
            );
            done();
          })
          .catch(done);
      });
    });
  });
});
