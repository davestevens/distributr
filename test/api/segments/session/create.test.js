"use strict";

import api from "../../../../api";
import models from "../../../../models";
import request from "supertest";

describe("API: Session", () => {
  describe("POST /api/segments/session", () => {
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

    context("with valid credentials", () => {
      it("returns a valid token", (done) => {
        request(api)
          .post("/api/segments/session")
          .send({
            username: "username",
            passphrase: "passphrase"
          })
          .expect(200)
          .end((error, response) => {
            if (error) return done(error);

            const body = response.body;
            expect(body).to.have.key("token");
            expect(body.token).not.to.be.undefined;

            done();
          });
      });
    });

    context("with invalid credentials", () => {
      it("returns validation errors", (done) => {
        request(api)
          .post("/api/segments/session")
          .send({
            username: "username",
            passphrase: "incorrect"
          })
          .expect(401)
          .end((error, response) => {
            if (error) return done(error);

            const body = response.body;
            expect(body.message).to.equal("Incorrect login details");

            done();
          });
      });
    });
  });
});
