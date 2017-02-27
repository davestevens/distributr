"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchApps } from "../actions/apps";
import ListGroup from "react-bootstrap/lib/ListGroup";
import Loading from "./Loading.jsx";
import App from "./Apps/App.jsx";

class Apps extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchApps());
  }

  render() {
    const { loading } = this.props;

    return (
      <div>
        <h2>Apps</h2>
        <ListGroup>
          { loading && <Loading /> }
          { this._apps() }
        </ListGroup>
      </div>
    );
  }

  _apps() {
    const { apps } = this.props;

    return apps.map((app, index) => (
      <App { ...app } key={ index } />
    ));
  }
}

Apps.propTypes = {
  apps: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

Apps.defaultProps = {
  apps: [],
  loading: true
}

const mapStateToProps = (state) => state.apps

export default connect(
  mapStateToProps
)(Apps);
