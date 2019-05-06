import * as axios from "axios";
const { createHash } = require("crypto");
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");

var decoder = new TextDecoder("utf8");
var encoder = new TextEncoder("utf8");
const FAMILY = "AdminTP";
const BASE_URL = "http://localhost:4000/api";

function hash(v) {
  return createHash("sha512")
    .update(v)
    .digest("hex");
}
function GetUnits() {
  const url = `${BASE_URL}/state?address=${hash(FAMILY).substr(0, 8)}00`;
  return axios
    .get(url)
    .then(x => {
      return x.data.data.map(y => {
        let d = JSON.parse(new Buffer(y.data, "base64").toString());
        let img = "http://localhost:4000/bucket/images/" + d[0].toString();
        d.unshift(y.address, img);
        return d;
      });
    })
    .catch(error => []);
}

export { GetUnits };
