"use strict";

import React from "react";

const STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.1)"
};

const Loading = () => (
  <div style={ STYLE }>
    Loading...
  </div>
);

export default Loading;
