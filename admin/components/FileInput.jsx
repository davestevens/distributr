"use strict";

import React, { Component } from "react";
import { Field } from "redux-form";
import { Labeled } from "admin-on-rest/lib/mui";

class FileInput extends Component {
  render() {
    return (
      <Labeled label="File">
        <div>
          <Field name="file" component="input" type="file" />
        </div>
      </Labeled>
    );
  }
}

export default FileInput;
