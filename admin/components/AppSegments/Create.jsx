"use strict";

import React from "react";
import {
  Create, SimpleForm, SelectInput, ReferenceInput
} from "admin-on-rest/lib/mui";

const AppSegmentCreate = (props) => (
  <Create title="Create an App Segment" {...props }>
    <SimpleForm>
      <ReferenceInput label="App" source="app_id" reference="apps" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Segment" source="segment_id" reference="segments" allowEmpty>
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default AppSegmentCreate;
