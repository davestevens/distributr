"use strict";

import {
  APPS_REQUEST, APPS_RECEIVE, APPS_FAILURE
} from "../actions/apps";

const defaultState = {
  loading: false,
  apps: []
}

const apps = (state = defaultState, action) => {
  switch(action.type) {
  case APPS_REQUEST:
    return {
      loading: true,
      apps: []
    }
  case APPS_RECEIVE:
    return {
      loading: false,
      apps: action.payload
    }
  case APPS_FAILURE:
    return {
      loading: false,
      apps: [],
      errorMessage: action.payload.message
    }
  default:
    return state;
  }
}

export default apps;
