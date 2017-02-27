"use strict";

import api from "../../../../api";
import models from "../../../../models";
import request from "supertest";

describe("API: Session", () => {
  describe("POST /api/admin/session", () => {
    let user;

    before(done => {
      models.User.create({ email: "test@example.com", password: "12345678" })
        .then(u => user = u)
        .then(() => done())
        .catch(done);
    });

    after(done => {
      user.destroy()
        .then(() => done())
        .catch(done);
    });

    context("with valid credentials", () => {
      it("returns a valid token", (done) => {
        request(api)
          .post("/api/admin/session")
          .send({
            email: "test@example.com",
            password: "12345678"
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
          .post("/api/admin/session")
          .send({
            email: "test@example.com",
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
