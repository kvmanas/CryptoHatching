import * as axios from "axios";
const { createHash } = require("crypto");
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");

var decoder = new TextDecoder("utf8");
var encoder = new TextEncoder("utf8");
const Admin_FAMILY = "AdminTP";
const Oracle_FAMILY = "OracleTP";
const BASE_URL = "http://localhost:4000/api";

function hash(v) {
  return createHash("sha512")
    .update(v)
    .digest("hex");
}
function GetUnits() {
  const url = `${BASE_URL}/state?address=${hash(Admin_FAMILY).substr(0, 8)}00`;
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
function UserList() {
  const url = `${BASE_URL}/state?address=${hash(Oracle_FAMILY).substr(
    0,
    8
  )}0011`;
  return axios
    .get(url)
    .then(x => {
      console.log(x);
      try {
        return x.data.data.map(y => {
          return JSON.parse(new Buffer(y.data, "base64").toString())[0];
        });
      } catch {
        return [];
      }
    })
    .catch(error => []);
}
function GetPrdUnits() {
  const url = `${BASE_URL}/state?address=${hash(Admin_FAMILY).substr(
    0,
    8
  )}0011`;
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
function GetBrkUnits() {
  const url = `${BASE_URL}/state?address=${hash(Admin_FAMILY).substr(
    0,
    8
  )}0022`;
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
function GetUserDt(PubKey) {
  const url = `${BASE_URL}/state?address=${hash(Oracle_FAMILY).substr(
    0,
    8
  )}0011${hash(PubKey).substr(0, 58)}`;
  return axios
    .get(url)
    .then(x => {
      try {
        return JSON.parse(
          new Buffer(x.data.data[0].data, "base64").toString()
        )[0];
      } catch {
        return [];
      }
    })
    .catch(error => []);
}
function GetReceipt(url) {
  return axios
    .get(url)
    .then(x => {
      try {
        return new Buffer(x.data.data[0].data[0], "base64").toString();
      } catch {
        return [];
      }
    })
    .catch(error => []);
}

export { GetUnits, GetUserDt, GetPrdUnits, GetBrkUnits, UserList, GetReceipt };
