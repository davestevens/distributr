"use strict";

import List from "./Segments/List.jsx";
import Edit from "./Segments/Edit.jsx";
import Create from "./Segments/Create.jsx";
import { Delete } from "admin-on-rest/lib/mui";

export default {
  list: List,
  edit: Edit,
  create: Create,
  remove: Delete
};
