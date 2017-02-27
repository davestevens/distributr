"use strict";

import React from "react";
import moment from "moment";
import Label from "react-bootstrap/lib/Label";

const Header = (number, createdAt) => {
  const date = moment(createdAt);
  return (
    <div>
      { number }
      <Label style={ { float: "right" } }
             title={ date.format("LLLL") }>
        { date.fromNow() }
      </Label>
    </div>
  );
}

export default Header;
