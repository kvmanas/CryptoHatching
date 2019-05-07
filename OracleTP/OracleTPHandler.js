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

const FAMILY = "OracleTP";
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
      let Operation = msg[0];
      if (Operation === "NewUser") {
        this.address = NAMESPACE + "0011" + hash(msg[1]).substr(0, 58);
        return context.getState([this.address]).then(data => {
          if (data[this.address].length === 0) {
            console.log("hi");
            let UserDt = [
              {
                Production: 1,
                Attack: 0,
                Defence: 0,
                EggBalance: 0,
                LastActivity: msg[2],
                Birds: {},
                Piggs: {}
              }
            ];
            return _setEntry(context, this.address, JSON.stringify(UserDt));
          } else {
            // console.log(
            //   "Exsting Data",
            //   JSON.parse(new Buffer(data[this.address], "base64").toString())
            // );
            _toInternalError("Invalid Type");
          }
        });
      } else {
        _toInternalError("Invalid Type");
      }
    } catch (err) {
      _toInternalError(err);
    }
  }
}

module.exports = AdminTPHandler;
