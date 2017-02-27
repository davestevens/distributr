"use strict";

import models from "../../models";

describe("Models: App", () => {
  const App = models.App;

  describe("Validations", () => {
    describe("name", () => {
      it("is required", (done) => {
        const app = App.build({
          name: "",
          description: "App Description",
          identifier: "com.identifier",
          kind: "android"
        });

        app.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });
    });

    describe("description", () => {
      it("is required", (done) => {
        const app = App.build({
          name: "App Name",
          description: "",
          identifier: "com.identifier",
          kind: "android"
        });

        app.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });
    });

    describe("identifier", () => {
      it("is required", (done) => {
        const app = App.build({
          name: "App Name",
          description: "App Description",
          identifier: "",
          kind: "android"
        });

        app.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is required");
            done();
          })
          .catch(done);
      });
    });

    describe("kind", () => {
      it("must be one of android or ios", (done) => {
        const app = App.build({
          name: "App Name",
          description: "App Description",
          identifier: "com.identifier",
          kind: "something"
        });

        app.validate()
          .then(error => {
            expect(error.message).to.equal("Validation error: is not valid");
            done();
          })
          .catch(done);
      });
    });
  });
});
