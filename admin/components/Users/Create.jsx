"use strict";

import React from "react";
import { Create, SimpleForm, TextInput } from "admin-on-rest/lib/mui";

const UserCreate = (props) => (
  <Create title="Create a User" {...props }>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="password" type="password" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
