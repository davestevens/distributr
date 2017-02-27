"use strict";

import models from "../../models";

describe("Models: AppSegment", () => {
  const AppSegment = models.AppSegment;

  describe("Validations", () => {
    let app, segment;

    before(done => {
      models.App.create({
        name: "App Name",
        description: "App Description",
        identifier: "com.identifier",
        kind: "android"
      })
        .then(a => {
          app = a;
          return models.Segment.create({
            username: "username",
            passphrase: "passphrase"
          })
            .then(s => {
              segment = s;
              return app.addSegment(segment);
            })
        })
        .then(() => done())
        .catch(done);
    });

    after(done => {
      Promise.all([app.destroy(), segment.destroy()])
        .then(() => done())
        .catch(done);
    });

    describe("App", () => {
      it("must be a valid App", (done) => {
        const appSegment = AppSegment.build({
          app_id: "123",
          segment_id: segment.id
        });

        appSegment.validate()
          .then(error => {
            expect(error.message)
              .to.equal("Validation error: must be a valid App");
            done();
          })
          .catch(done);
      });
    });

    describe("Segment", () => {
      it("must be a valid Segment", (done) => {
        const appSegment = AppSegment.build({
          app_id: app.id,
          segment_id: "123"
        });

        appSegment.validate()
          .then(error => {
            expect(error.message)
              .to.equal("Validation error: must be a valid Segment");
            done();
          })
          .catch(done);
      });
    });

    it("must be unique", (done) => {
      const appSegment = AppSegment.build({
        app_id: app.id,
        segment_id: segment.id
      });

      appSegment.validate()
        .then(error => {
          expect(error.message).to.equal("Validation error: must be unique");
          done();
        })
        .catch(done);
    });
  });

  describe("Associations", () => {
    let app, segment, appSegment;

    before(done => {
      models.App.create({
        name: "App Name",
        description: "App Description",
        identifier: "com.identifier",
        kind: "android"
      })
        .then(a => {
          app = a;
          return models.Segment.create({
            username: "username",
            passphrase: "passphrase"
          })
            .then(s => {
              segment = s;
              return AppSegment.create({
                app_id: app.id,
                segment_id: segment.id
              })
                .then(aS => appSegment = aS);
            });
        })
        .then(() => done())
        .catch(done);
    });

    after(done => {
      Promise.all([app.destroy(), segment.destroy()])
        .then(() => done())
        .catch(done);
    });

    describe("App", () => {
      it("belongs to an App", (done) => {
        appSegment.getApp()
          .then(associatedApp => {
            expect(associatedApp.id).to.equal(app.id);
            done();
          })
          .catch(done);
      });
    });

    describe("Segment", () => {
      it("belongs to a Segment", (done) => {
        appSegment.getSegment()
          .then(associatedSegment => {
            expect(associatedSegment.id).to.equal(segment.id);
            done();
          })
          .catch(done);
      });
    });
  });
});
