"use strict";

import React, { PropTypes } from "react";
import Button from "react-bootstrap/lib/Button";

const Version = ({ id, number }) => (
  <Button href={ `/api/versions/${ id }` }
          target="_blank"
          bsSize="large"
          bsStyle="primary">
    Download latest version ({ number })
  </Button>
);

Version.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired
}

export default Version;
