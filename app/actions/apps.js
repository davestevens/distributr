"use strict";

import { getAuth } from "./auth";
import { CALL_API } from "redux-api-middleware";

export const APPS_REQUEST = "APPS_REQUEST";
export const APPS_RECEIVE = "APPS_RECEIVE";
export const APPS_FAILURE = "APPS_FAILURE";

export const fetchApps = () => {
  return {
    [CALL_API]: {
      endpoint: "/api/segments/apps",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": getAuth()
      },
      types: [APPS_REQUEST, APPS_RECEIVE, APPS_FAILURE]
    }
  }
}
