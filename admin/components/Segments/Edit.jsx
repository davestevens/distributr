"use strict";

import React, { PropTypes } from "react";
import {
  Edit, SimpleForm, TextInput, DisabledInput
} from "admin-on-rest/lib/mui";

const Title = ({ record }) => {
  return <span>Segment { record.username }</span>;
};

Title.propTypes = {
  record: PropTypes.object
}

const SegmentEdit = (props) => (
  <Edit title={ <Title /> } {...props }>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="username" />
      <TextInput source="passphrase" />
    </SimpleForm>
  </Edit>
);

export default SegmentEdit;
