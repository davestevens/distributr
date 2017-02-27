"use strict";

import { combineReducers } from "redux";
import auth from "./auth";
import apps from "./apps";

const reducers = combineReducers({
  auth,
  apps
});

export default reducers;
