"use strict";

import React from "react";
import { Route, IndexRoute } from "react-router";
import Apps from "./components/Apps.jsx";
import App from "./components/App.jsx";

export default (
  <Route>
    <Route path="/" component={ Apps } />
    <Route path="apps">
      <IndexRoute component={ Apps } />
      <Route path=":id" component={ App } />
    </Route>
  </Route>
);
