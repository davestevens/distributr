"use strict";

import List from "./Versions/List.jsx";
import Edit from "./Versions/Edit.jsx";
import Create from "./Versions/Create.jsx";
import { Delete } from "admin-on-rest/lib/mui";

export default {
  list: List,
  edit: Edit,
  create: Create,
  remove: Delete
};
