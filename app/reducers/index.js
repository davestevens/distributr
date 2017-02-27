"use strict";

import { combineReducers } from "redux";
import auth from "./auth";
import apps from "./apps";
import app from "./app";

const reducers = combineReducers({
  auth,
  apps,
  app
});

export default reducers;
