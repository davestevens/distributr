"use strict";

import {
  AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT,
  getAuth, setAuth
} from "../actions/auth";

const defaultState = {
  loading: false,
  authed: !!getAuth(),
  token: getAuth()
}

const auth = (state = defaultState, action) => {
  switch(action.type) {
  case AUTH_REQUEST:
    return {
      loading: true,
      authed: false,
      token: null
    }
  case AUTH_SUCCESS: {
    const token = action.payload.token;
    setAuth(token)
    return {
      loading: false,
      authed: true,
      token: token
    }
  }
  case AUTH_FAILURE:
    return {
      loading: false,
      authed: false,
      token: null,
      errorMessage: action.payload.response.message
    }
  case LOGOUT:
    return {
      loading: false,
      authed: false,
      token: null,
      errorMessage: action.errorMessage
    }
  default:
    return state;
  }
}

export default auth;
