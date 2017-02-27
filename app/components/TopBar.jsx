"use strict";

import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";

const TopBar = () => (
  <Navbar inverse
          fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Distributr</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

export default TopBar;
