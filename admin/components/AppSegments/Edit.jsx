"use strict";

import React, { PropTypes } from "react";
import {
  Edit, SimpleForm, DisabledInput, SelectInput, ReferenceInput
} from "admin-on-rest/lib/mui";

const Title = ({ record }) => {
  return <span>App Segment { record.number }</span>;
};

Title.propTypes = {
  record: PropTypes.object
}

const AppSegmentEdit = (props) => (
  <Edit title={ <Title /> } {...props }>
    <SimpleForm>
      <DisabledInput source="id" />
      <ReferenceInput label="App" source="app_id" reference="apps">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Segment" source="segment_id" reference="segments">
        <SelectInput optionText="username" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default AppSegmentEdit;
