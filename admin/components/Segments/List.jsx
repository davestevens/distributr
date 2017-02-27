"use strict";

import React from "react";
import { List, Datagrid, TextField, EditButton } from "admin-on-rest/lib/mui";

const SegmentList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="username" />
      <EditButton basePath="/segments" />
    </Datagrid>
  </List>
);

export default SegmentList;
