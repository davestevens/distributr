"use strict";

import _ from "lodash";

import {
  APP_REQUEST, APP_RECEIVE, APP_FAILURE
} from "../actions/app";

const defaultState = {
  loading: false,
  name: "Loading",
  description: "Loading",
  versions: []
}

const app = (state = defaultState, action) => {
  switch(action.type) {
  case APP_REQUEST:
    return _.extend({}, defaultState, { loading: true });
  case APP_RECEIVE:
    return _.extend({}, action.payload, { loading: false });
  case APP_FAILURE:
    return _.extend({}, state, {
      loading: false,
      errorMessage: action.payload.message,
      errors: action.payload.response.errors
    });
  default:
    return state;
  }
}

export default app;
