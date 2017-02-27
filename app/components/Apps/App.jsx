"use strict";

import React, { Component, PropTypes } from "react";
import { withRouter } from "react-router";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

const STYLE = {
  whiteSpace: "pre-wrap"
}

class App extends Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const { description, name } = this.props;

    return (
      <ListGroupItem header={ name }
                     href="#"
                     onClick={ this._handleClick }
                     style={ STYLE }>
        { description }
      </ListGroupItem>
    );
  }

  _handleClick(event) {
    event.preventDefault();
    const { id, router } = this.props;
    router.push(`/apps/${ id }`);
  }
}

App.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired
}

export default withRouter(App);
