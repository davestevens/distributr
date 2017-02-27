"use strict";

import List from "./Users/List.jsx";
import Edit from "./Users/Edit.jsx";
import Create from "./Users/Create.jsx";
import { Delete } from "admin-on-rest/lib/mui";

export default {
  list: List,
  edit: Edit,
  create: Create,
  remove: Delete
};
