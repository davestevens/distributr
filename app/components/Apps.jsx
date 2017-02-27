"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchApps } from "../actions/apps";
import { List } from "material-ui/List";
import Divider from "material-ui/Divider";
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
      <List style={ { width: "100%" } }>
        { loading && <Loading /> }
        { this._apps() }
      </List>
    );
  }

  _apps() {
    const { apps } = this.props;

    return apps.reduce((memo, app, index) => {
      memo.push(<App { ...app } key={ index } />);
      if (index < apps.length - 1) {
        memo.push(<Divider key={ `divider-${ index }` } />);
      }
      return memo;
    }, [])
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
