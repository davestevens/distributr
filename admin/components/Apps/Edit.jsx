"use strict";

import React, { PropTypes } from "react";
import {
  Edit, SimpleForm, TextInput, DisabledInput, LongTextInput, SelectInput
} from "admin-on-rest/lib/mui";

const Title = ({ record }) => {
  return <span>App { record.name }</span>;
};

Title.propTypes = {
  record: PropTypes.object
}

const AppEdit = (props) => (
  <Edit title={ <Title /> } {...props }>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" />
      <LongTextInput source="description" />
      <TextInput source="identifier" />
      <SelectInput source="kind" choices={[
        { id: "android", name: "Android" },
        { id: "ios", name: "iOS" }
                                          ]} />
    </SimpleForm>
  </Edit>
);

export default AppEdit;
