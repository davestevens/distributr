"use strict";

import React from "react";
import { Router, hashHistory } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import TopBar from "../components/TopBar.jsx";
import Auth from "./Auth.jsx";
import routes from "../routes";

injectTapEventPlugin();

const STYLE = {
  maxWidth: "calc(100% - 24px)",
  margin: "24px auto"
}

const App = () => (
  <MuiThemeProvider>
    <div className="app">
      <TopBar />
      <div style={ STYLE }>
        <Auth>
          <Router history={ hashHistory } routes={ routes } />
        </Auth>
      </div>
    </div>
  </MuiThemeProvider>
)

export default App;
