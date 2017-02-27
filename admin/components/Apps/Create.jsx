"use strict";

import React from "react";
import {
  Create, SimpleForm, TextInput, LongTextInput, SelectInput
} from "admin-on-rest/lib/mui";

const AppCreate = (props) => (
  <Create title="Create an App" {...props }>
    <SimpleForm>
      <TextInput source="name" />
      <LongTextInput source="description" />
      <TextInput source="identifier" />
      <SelectInput source="kind" choices={[
        { id: "android", name: "Android" },
        { id: "ios", name: "iOS" }
                                          ]} />
    </SimpleForm>
  </Create>
);

export default AppCreate;
