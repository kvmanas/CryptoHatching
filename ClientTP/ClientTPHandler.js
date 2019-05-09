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

const FAMILY = "ClientTP";
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
  //code here
  let msgBytes = encoder.encode(stateValue);
  let entries = {
    [address]: msgBytes
  };
  return context.setState(entries);
}
function _delEntry(context, address) {
  return context.deleteState([address]);
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
      if (msg[0] === "NewUser") {
        return context.addEvent("ClientTP/NewUser", [
          ["pubkey", this.publicKey]
        ]);
      } else if (msg[0] === "BuyUnit") {
        msg[0] = this.publicKey;
        var newdata = JSON.stringify(msg);
        return context.addEvent("ClientTP/BuyUnit", [["data", newdata]]);
      } else if (msg[0] === "BuyPower") {
        msg[0] = this.publicKey;
        var newdata = JSON.stringify(msg);
        return context.addEvent("ClientTP/BuyPower", [["data", newdata]]);
      } else if (msg[0] === "BuyMax") {
        msg[0] = this.publicKey;
        var newdata = JSON.stringify(msg);
        return context.addEvent("ClientTP/BuyMax", [["data", newdata]]);
      } else {
        _toInternalError("Invalid Type");
      }
    } catch (err) {
      _toInternalError(err);
    }
  }
}

module.exports = AdminTPHandler;
