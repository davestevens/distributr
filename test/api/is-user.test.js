"use strict";

import isUser from "../../api/is-user";
import models from "../../models";

describe("API: isUser", () => {
  context("without a token", () => {
    it("throws a Not Authorized error", (done) => {
      const req = { headers: { "x-access-token": null } };
      const res = {};

      isUser(req, res, (error) => {
        expect(error.statusCode).to.equal(401);
        done();
      })
    });
  });

  context("with an invalid token", () => {
    it("throws a Not Authorized error", (done) => {
      const req = { headers: { "x-access-token": "invalid token" } };
      const res = {};

      isUser(req, res, (error) => {
        expect(error.statusCode).to.equal(401);
        done();
      })
    });
  });

  describe("As a User", () => {
    let user;

    before(done => {
      models.User.create({ email: "test@example.com", password: "password" })
        .then(u => user = u)
        .then(() => done())
        .catch(done);
    });

    after(done => {
      user.destroy()
        .then(() => done())
        .catch(done);
    });

    context("with a valid token", () => {
      it("stores the User on the request object", (done) => {
        const req = { headers: { "x-access-token": user.buildToken() } };
        const res = {};

        isUser(req, res, () => {
          expect(req.user.id).to.deep.equal(user.id);
          done();
        })
      });
    });
  });

  describe("As a Segment", () => {
    let segment;

    before(done => {
      models.Segment.create({ username: "username", passphrase: "passphrase" })
        .then(s => segment = s)
        .then(() => done())
        .catch(done);
    });

    after(done => {
      segment.destroy()
        .then(() => done())
        .catch(done);
    });

    it("throws a Not Authorized error", (done) => {
      const req = { headers: { "x-access-token": segment.buildToken() } };
      const res = {};

      isUser(req, res, (error) => {
        expect(error.statusCode).to.equal(401);
        done();
      })
    });
  });
});
