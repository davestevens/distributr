"use strict";

import React from "react";
import { List, Datagrid, TextField, ReferenceField, EditButton } from "admin-on-rest/lib/mui";

const AppSegmentList = (props) => (
  <List {...props}>
    <Datagrid>
      <ReferenceField label="App" source="app_id" reference="apps">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField label="Segment" source="segment_id" reference="segments">
        <TextField source="username" />
      </ReferenceField>
      <EditButton basePath="/app-segments" />
    </Datagrid>
  </List>
);

export default AppSegmentList;
