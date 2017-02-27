"use strict";

const addUploadCapabilities = requestHandler => (type, resource, params) => {
  if (type === "CREATE" && resource === "versions") {
    if (params.data.file && params.data.file.length) {
      const formData = new FormData();
      for(var key in params.data) {
        if (key == "file") {
          formData.append(key, params.data[key][0]);
        }
        else {
          formData.append(key, params.data[key]);
        }
      }
      params.data = formData;
      return requestHandler(type, resource, params);
    }
  }

  return requestHandler(type, resource, params);
};

export default addUploadCapabilities;
