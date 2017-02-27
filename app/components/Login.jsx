"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Loading from "./Loading.jsx";
import { login } from "../actions/auth";

const STYLE = {
  textAlign: "center",
  padding: 24
}

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

    return(
      <Paper>
        <form onSubmit={ this._login }
              style={ STYLE }>
          { loading && <Loading /> }
          <div>
            <TextField label={ hasError ? errorMessage : "Username" }
                       type="text"
                       error={ hasError }
                       onChange={ (event) => this.setState({ username: event.target.value }) } />
          </div>
          <div>
            <TextField label="Password"
                       type="password"
                       onChange={ (event) => this.setState({ password: event.target.value }) } />
          </div>
          <div>
            <Button type="submit"
                    raised={ true }
                    primary={ true }
                    disabled={ loading }>
              Login
            </Button>
          </div>
        </form>
      </Paper>
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
