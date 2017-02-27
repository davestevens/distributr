"use strict";

import List from "./AppSegments/List.jsx";
import Create from "./AppSegments/Create.jsx";
import Edit from "./AppSegments/Edit.jsx";
import { Delete } from "admin-on-rest/lib/mui";

export default {
  list: List,
  edit: Edit,
  create: Create,
  remove: Delete
};
