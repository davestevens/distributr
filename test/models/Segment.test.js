"use strict";

import models from "../../models";

describe("Model: Segment", () => {
  const Segment = models.Segment;

  describe("Validations", () => {
    describe("username", () => {
      let anotherSegment;
      before(done => {
        Segment.create({ username: "username", passphrase: "passphrase" })
          .then(s => anotherSegment = s)
          .then(() => done())
          .catch(done);
      });

      after(done => {
        anotherSegment.destroy()
          .then(() => done())
          .catch(done);
      });

      it("it required", (done) => {
        const segment = Segment.build({
          username: "",
          passphrase: "passphrase"
        });

        segment.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });

      it("it must be unique", (done) => {
        const segment = Segment.build({
          username: "username",
          passphrase: "passphrase"
        });

        segment.validate()
          .then(error => {
            expect(error.message)
              .to.equal("Validation error: is already in use");
            done();
          })
          .catch(done);
      });
    });

    describe("passphrase", () => {
      it("is required", (done) => {
        const segment = Segment.build({
          username: "user",
          passphrase: ""
        });

        segment.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });
    });
  });

  describe("Associations", () => {
    describe("Apps", () => {
      let app, segment;

      before(done => {
        Segment.create({
          username: "username",
          passphrase: "passphrase"
        })
          .then(s => {
            segment = s;
            return models.App.create({
              name: "App Name",
              description: "App Description",
              identifier: "com.identifier",
              kind: "android"
            })
              .then(a => {
                app = a;
                return segment.addApp(app);
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

      it("belongs to many Apps", (done) => {
        segment.getApps()
          .then(associatedApps => {
            expect(associatedApps).to.have.length(1);
            done();
          })
          .catch(done);
      });
    });
  });
});
