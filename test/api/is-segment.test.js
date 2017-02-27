"use strict";

import isSegment from "../../api/is-segment";
import models from "../../models";

describe("API: isSegment", () => {
  context("without a token", () => {
    it("throws a Not Authorized error", (done) => {
      const req = { headers: { "x-access-token": null } };
      const res = {};

      isSegment(req, res, (error) => {
        expect(error.statusCode).to.equal(401);
        done();
      })
    });
  });

  context("with an invalid token", () => {
    it("throws a Not Authorized error", (done) => {
      const req = { headers: { "x-access-token": "invalid token" } };
      const res = {};

      isSegment(req, res, (error) => {
        expect(error.statusCode).to.equal(401);
        done();
      })
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

    context("with a valid token", () => {
      it("stores the Segment on the request object", (done) => {
        const req = { headers: { "x-access-token": segment.buildToken() } };
        const res = {};

        isSegment(req, res, () => {
          expect(req.segment.id).to.deep.equal(segment.id);
          done();
        })
      });
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

    it("throws a Not Authorized error", (done) => {
      const req = { headers: { "x-access-token": user.buildToken() } };
      const res = {};

      isSegment(req, res, (error) => {
        expect(error.statusCode).to.equal(401);
        done();
      })
    });
  });
});
