"use strict";

import React, { PropTypes } from "react";
import PanelGroup from "react-bootstrap/lib/PanelGroup";
import Panel from "react-bootstrap/lib/Panel";
import Button from "react-bootstrap/lib/Button";
import Header from "./Header.jsx";

const STYLE = {
  whiteSpace: "pre-wrap"
}

const PreviousVersions = ({ versions }) => (
  <PanelGroup accordion>
  {
    versions.map((version, index) => (
      <Panel header={ Header(version.number, version.createdAt) }
             eventKey={ version.id }
             key={ index }>
        <p style={ STYLE }>{ version.notes }</p>
        <Button href={ `/api/versions/${ version.id }` }
                target="_blank"
                bsSize="small">
          Download
        </Button>
      </Panel>
    ))
  }
  </PanelGroup>
);

PreviousVersions.propTypes = {
  versions: PropTypes.array.isRequired
}

PreviousVersions.defaultProps = {
  versions: []
}

export default PreviousVersions;
