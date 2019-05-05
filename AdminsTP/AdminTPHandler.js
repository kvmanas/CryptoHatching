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
const NAMESPACE = hash(FAMILY).substr(0, 6);

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
      this.address =
        hash(FAMILY).substr(0, 6) + hash(this.publicKey).substr(0, 64);
      //tp request variables
      var msg = decoder.decode(transactionProcessRequest.payload);
      return _setEntry(context, this.address, msg);
    } catch (err) {
      _toInternalError(err);
    }
  }
}

module.exports = AdminTPHandler;
