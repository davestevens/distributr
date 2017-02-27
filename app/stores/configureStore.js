"use strict";

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import rootReducer from "../reducers";

const configureStore = createStore(
  rootReducer,
  applyMiddleware(apiMiddleware, thunk)
)

export default configureStore;
