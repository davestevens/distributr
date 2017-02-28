"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Loading from "./Loading.jsx";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import HelpBlock from "react-bootstrap/lib/HelpBlock";
import Button from "react-bootstrap/lib/Button";
import { login } from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null
    }

    this._login = this._login.bind(this);
  }

  render() {
    const { errorMessage, loading } = this.props;
    const hasError = !!errorMessage;

    return (
      <form onSubmit={ this._login }>
        { loading && <Loading /> }
        <FormGroup bsSize="large"
                   validationState={ hasError ? "error" : null }>
          <ControlLabel>Username</ControlLabel>
          <FormControl type="text"
                       autoCorrect="off"
                       autoCapitalize="none"
                       autoComplete="off"
                       placeholder="Username"
                       onChange={ (event) => this.setState({ username: event.target.value }) } />
          { hasError && <HelpBlock>{ errorMessage }</HelpBlock> }
        </FormGroup>
        <FormGroup bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"
                       placeholder="Password"
                       onChange={ (event) => this.setState({ password: event.target.value }) } />
        </FormGroup>
        <Button type="submit"
                bsStyle="primary"
                bsSize="large"
                block>
          Login
        </Button>
      </form>
    );
  }

  _login(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.state;

    const credentials = {
      username: username,
      passphrase: password
    };

    dispatch(
      login(credentials)
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired
}

export default connect()(Login);
