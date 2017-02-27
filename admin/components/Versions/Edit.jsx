"use strict";

import React, { PropTypes } from "react";
import {
  Edit, SimpleForm, TextInput, DisabledInput, LongTextInput, SelectInput, ReferenceInput
} from "admin-on-rest/lib/mui";

const Title = ({ record }) => {
  return <span>Version { record.number }</span>;
};

Title.propTypes = {
  record: PropTypes.object
}

const VersionEdit = (props) => (
  <Edit title={ <Title /> } {...props }>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="number" />
      <LongTextInput source="notes" />
      <ReferenceInput label="App" source="app_id" reference="apps">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default VersionEdit;
