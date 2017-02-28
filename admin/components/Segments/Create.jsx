"use strict";

import React from "react";
import {
  Create, SimpleForm, TextInput
} from "admin-on-rest/lib/mui";

const SegmentCreate = (props) => (
  <Create title="Create a Segment" {...props }>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="passphrase" />
    </SimpleForm>
  </Create>
);

export default SegmentCreate;
