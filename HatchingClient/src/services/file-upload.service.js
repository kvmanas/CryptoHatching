import * as axios from "axios";

const BASE_URL = "http://localhost:4000/bucket";

function upload(formData) {
  const url = `${BASE_URL}/upload`;
  return (
    axios
      .post(url, formData)
      // get data
      .then(x => x.data)
      // add url field
      .then(
        x =>
          (x = {
            id: x.id,
            url: `${BASE_URL}/images/${x.id}`
          })
      )
  );
}

export { upload };
