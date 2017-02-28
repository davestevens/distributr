"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";

class TopBar extends Component {
  constructor(props) {
    super(props);

    this._logout = this._logout.bind(this);
  }

  render() {
    return (
      <Navbar inverse
              fixedTop
              collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Distributr</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            { this._logoutButton() }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  _logoutButton() {
    const { authed } = this.props;
    if (!authed) return null;

    return (
      <NavItem href="#"
               onClick={ this._logout }>
        Logout
      </NavItem>
    );
  }

  _logout(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(logout());
  }
}

TopBar.propTypes = {
  authed: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authed: state.auth.authed
});

export default connect(
  mapStateToProps
)(TopBar);
