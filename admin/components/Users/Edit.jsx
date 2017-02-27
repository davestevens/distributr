"use strict";

import React, { PropTypes } from "react";
import { Edit, SimpleForm, TextInput, DisabledInput } from "admin-on-rest/lib/mui";

const Title = ({ record }) => {
  return <span>User { record.email }</span>;
};

Title.propTypes = {
  record: PropTypes.object
}

const UserEdit = (props) => (
  <Edit title={ <Title /> } {...props }>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
