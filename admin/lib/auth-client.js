"use strict";

import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_CHECK } from "admin-on-rest";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request("/api/users/session", {
      method: "POST",
      body: JSON.stringify({ email: username, password }),
      headers: { "Content-Type": "application/json" }
    })
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  }
  return Promise.resolve();
}
