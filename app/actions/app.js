"use strict";

import { getAuth } from "./auth";
import { CALL_API } from "redux-api-middleware";

export const APP_REQUEST = "APP_REQUEST";
export const APP_RECEIVE = "APP_RECEIVE";
export const APP_FAILURE = "APP_FAILURE";

export const fetchApp = (id) => {
  return {
    [CALL_API]: {
      endpoint: `/api/segments/apps/${ id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getAuth()
      },
      types: [APP_REQUEST, APP_RECEIVE, APP_FAILURE]
    }
  }
}
