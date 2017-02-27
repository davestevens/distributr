"use strict";

import React from "react";
import { CircularProgress } from "material-ui/Progress";
import Layout from "material-ui/Layout";

const STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1101,
  backgroundColor: "rgba(0, 0, 0, 0.1)"
};

const Loading = () => (
  <Layout container
          gutter={ 0 }
          direction="row"
          justify="center"
          align="center"
          style={ STYLE }>
    <Layout item
            xs={ 12 }
            sm={ 8 }
            md={ 6 }>
      <CircularProgress />
    </Layout>
  </Layout>
);

export default Loading;
