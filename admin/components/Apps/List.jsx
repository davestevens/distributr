"use strict";

import React from "react";
import { List, Datagrid, TextField, ChipField, EditButton } from "admin-on-rest/lib/mui";

const AppList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="identifier" />
      <ChipField source="kind" />
      <EditButton basePath="/apps" />
    </Datagrid>
  </List>
);

export default AppList;
