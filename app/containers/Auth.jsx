"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Panel from "react-bootstrap/lib/Panel";
import Login from "../components/Login.jsx";

class Auth extends Component {
  render() {
    const { auth, children } = this.props;
    const isAuthed = auth.authed;

    if (isAuthed) return children;

    return (
      <Panel>
        <Login { ...auth } />
      </Panel>
    );
  }
}

Auth.propTypes = {
  auth: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Auth);
