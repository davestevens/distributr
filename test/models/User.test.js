"use strict";

import models from "../../models";

describe("Models: User", () => {
  const User = models.User;

  describe("Validations", () => {
    describe("email", () => {
      let anotherUser;
      before(done => {
        User.create({ email: "test@example.com" })
          .then(u => anotherUser = u)
          .then(() => done())
          .catch(done);
      });

      after(done => {
        anotherUser.destroy()
          .then(() => done())
          .catch(done);
      });

      it("must be unique", (done) => {
        const user = User.build({ email: "test@example.com" });

        user.validate()
          .then(error => {
            expect(error.message)
              .to.equal("Validation error: is already registered");
            done();
          })
          .catch(done);
      });
    });

    describe("password", () => {
      it("must be longer than 8 characters", (done) => {
        const user = User.build({
          email: "test2@example.com",
          password: "12345"
        });

        user.validate()
          .then(error => {
            expect(error.message)
              .to.equal("Validation error: must be 8 characters or longer");
            done();
          })
          .catch(done);
      });
    });
  });

  describe("#authenticate", () => {
    let user;

    before((done) => {
      User.create({ email: "test2@example.com", password: "password" })
        .then(u => user = u)
        .then(() => done())
        .catch(done);
    });

    after((done) => {
      user.destroy()
        .then(() => done())
        .catch(done);
    });

    context("when the provided password is correct", () => {
      it("returns the User", () => {
        const actual = user.authenticate("password");

        expect(actual).to.equal(user);
      });
    });

    context("when the provided password is incorrect", () => {
      it("returns false", () => {
        const actual = user.authenticate("incorrect_password");

        expect(actual).to.equal(false);
      });
    });
  });

  describe("#toJSON", () => {
    let user;

    before((done) => {
      User.create({ email: "test2@example.com", password: "password" })
        .then(u => user = u)
        .then(() => done())
        .catch(done);
    });

    after((done) => {
      user.destroy()
        .then(() => done())
        .catch(done);
    });

    it("omits password", () => {
      const actual = user.toJSON();

      expect(actual).not.to.have.key("password");
      expect(actual).not.to.have.key("passwordDigest");
    });
  });
});
