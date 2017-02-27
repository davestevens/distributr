"use strict";

import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Text from "material-ui/Text";

const STYLE = {
  color: "inherit"
}

const TopBar = () => (
  <AppBar>
    <Toolbar>
      <Text type="title" style={ STYLE }>Distributor</Text>
    </Toolbar>
  </AppBar>
);

export default TopBar;
