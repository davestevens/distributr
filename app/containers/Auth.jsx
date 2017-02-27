"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Login from "../components/Login.jsx";

class Auth extends Component {
  render() {
    const { auth, children } = this.props;
    const isAuthed = auth.authed;

    if (isAuthed) return children;

    return (
      <Login { ...auth } />
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
