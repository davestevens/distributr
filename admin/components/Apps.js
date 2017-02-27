"use strict";

import List from "./Apps/List.jsx";
import Edit from "./Apps/Edit.jsx";
import Create from "./Apps/Create.jsx";
import { Delete } from "admin-on-rest/lib/mui";

export default {
  list: List,
  edit: Edit,
  create: Create,
  remove: Delete
};
