"use strict";

import React from "react";
import { Admin, Resource } from "admin-on-rest";
import authClient from "../lib/auth-client";
import restClient from "../lib/rest-client";
import Apps from "../components/Apps";

const App = () => (
  <Admin authClient={ authClient }
         restClient={ restClient("/api/users") }
         title="Distributr">
    <Resource name="apps" { ...Apps } />
  </Admin>
);

export default App;
