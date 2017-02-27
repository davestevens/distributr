"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import Loading from "./Loading.jsx";
import { login } from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this._login = this._login.bind(this);
  }

  render() {
    const { errorMessage, loading } = this.props;

    return(
      <form onSubmit={ this._login } style={ { textAlign: "center" } }>
        { loading && <Loading /> }
        <div>
          <TextField floatingLabelText="Username"
                     type="text"
                     errorText={ errorMessage }
                     ref="username" />
        </div>
        <div>
          <TextField floatingLabelText="Password"
                     type="password"
                     ref="password" />
        </div>
        <div>
          <RaisedButton label="Login"
                        type="submit"
                        primary={ true }
                        disabled={ loading } />
        </div>
      </form>
    );
  }

  _login(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    const { username, password } = this.refs;

    const credentials = {
      username: username.getValue(),
      passphrase: password.getValue()
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
