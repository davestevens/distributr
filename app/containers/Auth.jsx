"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Layout from "material-ui/Layout";
import Login from "../components/Login.jsx";

class Auth extends Component {
  render() {
    const { auth, children } = this.props;
    const isAuthed = auth.authed;

    if (isAuthed) return children;

    return (
      <Layout container
              direction="row"
              justify="center"
              align="center">
        <Layout item
                xs={ 12 }
                sm={ 8 }
                md={ 6 }>
          <Login { ...auth } />
        </Layout>
      </Layout>
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
