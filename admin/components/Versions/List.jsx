"use strict";

import React from "react";
import { List, Datagrid, TextField, EditButton, ReferenceField } from "admin-on-rest/lib/mui";

const VersionList = (props) => (
  <List {...props}>
    <Datagrid>
      <ReferenceField label="App" source="app_id" reference="apps">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" />
      <EditButton basePath="/versions" />
    </Datagrid>
  </List>
);

export default VersionList;
