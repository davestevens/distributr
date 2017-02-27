"use strict";

import React from "react";
import { Admin, Resource } from "admin-on-rest";
import authClient from "../lib/auth-client";
import restClient from "../lib/rest-client";
import Apps from "../components/Apps";
import Segments from "../components/Segments";
import AppSegments from "../components/AppSegments";
import Users from "../components/Users";
import Versions from "../components/Versions";

const App = () => (
  <Admin authClient={ authClient }
         restClient={ restClient("/api/admin") }
         title="Distributr">
    <Resource name="apps" { ...Apps } />
    <Resource name="segments" { ...Segments } />
    <Resource name="app-segments" { ...AppSegments } />
    <Resource name="users" { ...Users } />
    <Resource name="versions" { ...Versions } />
  </Admin>
);

export default App;
