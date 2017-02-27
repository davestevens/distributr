"use strict";

import React from "react";
import {
  Create, SimpleForm, TextInput, LongTextInput, SelectInput, ReferenceInput
} from "admin-on-rest/lib/mui";

const AppCreate = (props) => (
  <Create title="Create a Version" {...props }>
    <SimpleForm>
      <TextInput source="number" />
      <LongTextInput source="notes" />
      <ReferenceInput label="App" source="app_id" reference="apps" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default AppCreate;
