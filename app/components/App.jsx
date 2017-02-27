"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchApp } from "../actions/app";
import Loading from "./Loading.jsx";
import Jumbotron from "react-bootstrap/lib/Jumbotron";
import LatestVersion from "./App/Version.jsx";
import PreviousVersions from "./App/PreviousVersions.jsx";

const STYLE = {
  whiteSpace: "pre-wrap"
}

class App extends Component {
  componentWillMount() {
    const { dispatch, params } = this.props;
    const { id } = params;
    dispatch(fetchApp(id));
  }

  render() {
    const { loading, name, description, versions } = this.props;
    const latestVersion = versions[0];

    return (
      <div>
        <Jumbotron>
          { loading && <Loading /> }
          <h2>{ name }</h2>
          <p style={ STYLE }>{ description }</p>
          { !!latestVersion && <LatestVersion { ...latestVersion } /> }
        </Jumbotron>
        <PreviousVersions versions={ versions } />
      </div>
    );
  }
}

App.propTypes = {
  description: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  versions: PropTypes.array.isRequired
}

App.defaultProps = {
  description: "Loading",
  loading: true,
  name: "Loading",
  versions: []
}

const mapStateToProps = (state) => state.app

export default withRouter(
  connect(
    mapStateToProps
  )(App)
);
