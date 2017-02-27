"use strict";

import React, { Component, PropTypes } from "react";
import { withRouter } from "react-router";
import { ListItem, ListItemText } from "material-ui/List";
import Avatar from "material-ui/Avatar";
/* import avatarOptions from "../../lib/avatar-options";
 */

class App extends Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    const { description, name } = this.props;

    return (
      <ListItem button
                onClick={ this._handleClick }>
        { this._avatar() }
        <ListItemText primary={ name }
                      secondary={ description } />
      </ListItem>
    );
  }

  _avatar() {
    const { kind } = this.props;
    const text = kind == "android" ? "A" : "iOS";
    return <Avatar>{ text }</Avatar>;
  }

  _handleClick() {
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
