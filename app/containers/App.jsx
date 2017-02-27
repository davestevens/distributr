"use strict";

import React from "react";
import { Router, hashHistory } from "react-router";
import TopBar from "../components/TopBar.jsx";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Auth from "./Auth.jsx";
import routes from "../routes";

const STYLE = {
  marginTop: 54,
  paddingTop: 24
}

const App = () => (
  <div className="app">
    <TopBar />
    <div style={ STYLE }>
      <Grid>
        <Row>
          <Col xs={ 12 }
               sm={ 10 } smOffset={ 1 }>
            <Auth>
              <Router history={ hashHistory } routes={ routes } />
            </Auth>
          </Col>
        </Row>
      </Grid>
    </div>
  </div>
)

export default App;
