"use strict";

import React from "react";
import { List, Datagrid, TextField, EditButton } from "admin-on-rest/lib/mui";

const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="email" />
      <EditButton basePath="/users" />
    </Datagrid>
  </List>
);

export default UserList;
