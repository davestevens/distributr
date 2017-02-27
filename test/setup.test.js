"use strict";

import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import models from "../models";

chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;

before((done) => {
  models.sequelize.sync({ force: true })
    .then(() => done())
    .catch(done);
});
