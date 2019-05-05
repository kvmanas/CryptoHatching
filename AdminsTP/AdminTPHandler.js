"use strict";

//require the handler module.
const { TransactionHandler } = require("sawtooth-sdk/processor/handler");
//declaring a constant variable.

const {
  InvalidTransaction,
  InternalError
} = require("sawtooth-sdk/processor/exceptions");
const { createHash } = require("crypto");
//require encoder and decoder
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");

const FAMILY = "AdminTP";
const Version = "1.0";
const NAMESPACE = hash(FAMILY).substr(0, 8);

var encoder = new TextEncoder("utf8");
var decoder = new TextDecoder("utf8");

function hash(v) {
  return createHash("sha512")
    .update(v)
    .digest("hex");
}

//function to display the errors
var _toInternalError = function(err) {
  //internal error message
  return new InternalError(err);
};

//function to set the entries in the block using the "SetState" function
function _setEntry(context, address, stateValue) {
  console.log("State value:");
  //code here
  let msgBytes = encoder.encode(stateValue);
  let entries = {
    [address]: msgBytes
  };
  return context.setState(entries);
}

class AdminTPHandler extends TransactionHandler {
  constructor() {
    super(FAMILY, [Version], [NAMESPACE]);
  }
  apply(transactionProcessRequest, context) {
    try {
      let header = transactionProcessRequest.header;
      this.publicKey = header.signerPublicKey;
      var msg = JSON.parse(decoder.decode(transactionProcessRequest.payload));
      let Operation = msg[0];
      console.log("NewUnit registr 12");
      if (Operation === "NewUnit") {
        console.log("NewUnit registr 123");
        let UnitType = msg[2];
        console.log("NewUnit registr 123" + UnitType);
        if (UnitType == "1") {
          this.address =
            NAMESPACE + "01" + hash(msg[1].toString()).substr(0, 60);
        } else {
          this.address =
            NAMESPACE + "02" + hash(msg[1].toString()).substr(0, 60);
        }
        console.log("NewUnit registr ");
        msg.shift();
        console.log("NewUnit registr1 ");
        let data = JSON.stringify(msg);
        console.log("NewUnit registr2 ");
        return _setEntry(context, this.address, data);
      } else {
        _toInternalError("Invalid Type");
      }
    } catch (err) {
      _toInternalError(err);
    }
  }
}

module.exports = AdminTPHandler;
