"use strict";

import React from "react";
import { Route, IndexRoute } from "react-router";
import Apps from "./components/Apps.jsx";

export default (
  <Route>
    <Route path="/" component={ Apps } />
    <Route path="apps">
      <IndexRoute component={ Apps } />
    </Route>
  </Route>
);
