"use strict";

import React from "react";
import { Router, hashHistory } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import AppBar from "material-ui/AppBar";
import Auth from "./Auth.jsx";
import routes from "../routes";

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <div className="app">
      <AppBar title="Distributr"
              showMenuIconButton={ false } />
      <Auth>
        <Router history={ hashHistory } routes={ routes } />
      </Auth>
    </div>
  </MuiThemeProvider>
)

export default App;
