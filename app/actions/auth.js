"use strict";

import { CALL_API } from "redux-api-middleware";

export const AUTH_REQUEST = "AUTH_REQUEST";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGOUT = "LOGOUT";

const AUTH_KEY = "token";
export const getAuth = () => {
  return localStorage.getItem(AUTH_KEY);
}
export const setAuth = (value) => {
  localStorage.setItem(AUTH_KEY, value);
}
export const clearAuth = () => {
  localStorage.removeItem(AUTH_KEY);
}

const logout = (errorMessage) => {
  clearAuth();
  return {
    type: LOGOUT,
    errorMessage: errorMessage
  }
}

export const login = ({ username, passphrase }) => {
  return {
    [CALL_API]: {
      endpoint: "/api/segments/session",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        passphrase: passphrase
      }),
      types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE]
    }
  }
}

export const authError = (message) => {
  return (dispatch) => {
    clearAuth();
    dispatch(logout(message));
  }
}
