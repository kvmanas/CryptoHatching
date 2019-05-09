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
function _setEntries(context, address, stateValue) {
  //code here
  let msgBytes1 = encoder.encode(stateValue[0]);
  let msgBytes2 = encoder.encode(stateValue[1]);
  let entries = {
    [address[0]]: msgBytes1,
    [address[1]]: msgBytes2
  };
  return context.setState(entries);
}

class AdminTPHandler extends TransactionHandler {
  constructor() {
    super(FAMILY, [Version], [NAMESPACE]);
  }
  apply(transactionProcessRequest, context) {
    try {
      console.log("Inside Apply:", transactionProcessRequest);
      let header = transactionProcessRequest.header;
      this.publicKey = header.signerPublicKey;
      var msg = JSON.parse(decoder.decode(transactionProcessRequest.payload));
      let Operation = msg[0];
      if (Operation === "NewUser") {
        this.address = NAMESPACE + "0011" + hash(msg[1]).substr(0, 58);
        return context.getState([this.address]).then(data => {
          if (data[this.address].length === 0) {
            let UserDt = [
              {
                Production: 1,
                Attack: 0,
                Defence: 0,
                EggBalance: 0,
                LastActivity: msg[2],
                Birds: {},
                Piggs: {},
                PubKey: msg[1],
                LastAttacked: msg[2],
                NoAttacks: 0,
                Attacklogs: {}
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
      } else if (Operation === "BuyUnit") {
        console.log("Buy unit inside: ");
        this.address = NAMESPACE + "0011" + hash(msg[1]).substr(0, 58);
        return context.getState([this.address]).then(data => {
          if (data[this.address].length !== 0) {
            let UserDt = JSON.parse(
              new Buffer(data[this.address], "base64").toString()
            )[0];
            console.log("Exsting user Dt: ", UserDt);
            if (msg[2] == 1) {
              var ExistingBird, EggBalance;
              var seconds = Math.floor((msg[7] - UserDt.LastActivity) / 1000);
              EggBalance = UserDt.EggBalance + seconds * UserDt.Production;
              try {
                if (UserDt.Birds[msg[3]].Qty === undefined) {
                  ExistingBird = 0;
                } else {
                  ExistingBird = UserDt.Birds[msg[3]].Qty;
                }
              } catch (e) {
                ExistingBird = 0;
              }
              var NewBirdCount = ExistingBird + parseInt(msg[4]);
              var Cost = parseInt(msg[6]) * msg[4];
              var Production = UserDt.Production + parseInt(msg[5]) * msg[4];
              UserDt.Production = Production;
              UserDt.EggBalance = EggBalance - Cost;
              UserDt.LastActivity = msg[7];
              try {
                UserDt.Birds[msg[3]].Qty = NewBirdCount;
              } catch (e) {
                UserDt.Birds[msg[3]] = {
                  Qty: NewBirdCount,
                  Power: 0,
                  Max: 0
                };
              }
              console.log("new userdata: ", UserDt);
              return _setEntry(context, this.address, JSON.stringify([UserDt]));
            } else if (msg[2] == 2) {
              var ExistingPigg, EggBalance;
              var seconds = Math.floor((msg[8] - UserDt.LastActivity) / 1000);
              EggBalance = UserDt.EggBalance + seconds * UserDt.Production;
              try {
                if (UserDt.Piggs[msg[3]].Qty === undefined) {
                  ExistingPigg = 0;
                } else {
                  ExistingPigg = UserDt.Piggs[msg[3]].Qty;
                }
              } catch (e) {
                ExistingPigg = 0;
              }
              var NewPiggCount = ExistingPigg + parseInt(msg[4]);
              var Cost = parseInt(msg[7]) * msg[4];
              var Attack = UserDt.Attack + parseInt(msg[5]) * msg[4];
              var Defence = UserDt.Defence + parseInt(msg[6]) * msg[4];
              UserDt.Attack = Attack;
              UserDt.Defence = Defence;
              UserDt.EggBalance = EggBalance - Cost;
              UserDt.LastActivity = msg[8];
              try {
                UserDt.Piggs[msg[3]].Qty = NewPiggCount;
              } catch (e) {
                UserDt.Piggs[msg[3]] = {
                  Qty: NewPiggCount,
                  Power: 0,
                  Max: 0
                };
              }
              console.log("new userdata: ", UserDt);
              return _setEntry(context, this.address, JSON.stringify([UserDt]));
            } else {
              _toInternalError("Invalid Type");
            }
          } else {
            // console.log(
            //   "Exsting Data",
            //   JSON.parse(new Buffer(data[this.address], "base64").toString())
            // );
            _toInternalError("Invalid Type");
          }
        });
      } else if (Operation === "BuyPower") {
        this.address = NAMESPACE + "0011" + hash(msg[1]).substr(0, 58);
        return context.getState([this.address]).then(data => {
          if (data[this.address].length !== 0) {
            let UserDt = JSON.parse(
              new Buffer(data[this.address], "base64").toString()
            )[0];
            if (msg[2] == 1) {
              var ExistingPower, EggBalance;
              var seconds = Math.floor((msg[5] - UserDt.LastActivity) / 1000);
              EggBalance = UserDt.EggBalance + seconds * UserDt.Production;
              try {
                if (UserDt.Birds[msg[3]].Power === undefined) {
                  ExistingPower = 0;
                } else {
                  ExistingPower = UserDt.Birds[msg[3]].Power;
                }
              } catch (e) {
                ExistingPower = 0;
              }
              var Cost = parseInt(msg[4]);
              UserDt.EggBalance = EggBalance - Cost;
              UserDt.LastActivity = msg[5];
              try {
                UserDt.Birds[msg[3]].Power = ExistingPower + 1;
              } catch (e) {
                UserDt.Birds[msg[3]] = {
                  Qty: 0,
                  Power: 1,
                  Max: 0
                };
              }
              console.log("new userdata: ", UserDt);
              return _setEntry(context, this.address, JSON.stringify([UserDt]));
            } else if (msg[2] == 2) {
              var ExistingPower, EggBalance;
              var seconds = Math.floor((msg[5] - UserDt.LastActivity) / 1000);
              EggBalance = UserDt.EggBalance + seconds * UserDt.Production;
              try {
                if (UserDt.Piggs[msg[3]].Power === undefined) {
                  ExistingPower = 0;
                } else {
                  ExistingPower = UserDt.Piggs[msg[3]].Power;
                }
              } catch (e) {
                ExistingPower = 0;
              }
              var Cost = parseInt(msg[4]);
              UserDt.EggBalance = EggBalance - Cost;
              UserDt.LastActivity = msg[5];
              try {
                UserDt.Piggs[msg[3]].Power = ExistingPower + 1;
              } catch (e) {
                UserDt.Piggs[msg[3]] = {
                  Qty: 0,
                  Power: 1,
                  Max: 0
                };
              }
              console.log("new userdata: ", UserDt);
              return _setEntry(context, this.address, JSON.stringify([UserDt]));
            } else {
              _toInternalError("Invalid Type");
            }
          } else {
            // console.log(
            //   "Exsting Data",
            //   JSON.parse(new Buffer(data[this.address], "base64").toString())
            // );
            _toInternalError("Invalid Type");
          }
        });
      } else if (Operation === "BuyMax") {
        this.address = NAMESPACE + "0011" + hash(msg[1]).substr(0, 58);
        return context.getState([this.address]).then(data => {
          if (data[this.address].length !== 0) {
            let UserDt = JSON.parse(
              new Buffer(data[this.address], "base64").toString()
            )[0];
            if (msg[2] == 1) {
              var ExistingMax, EggBalance;
              var seconds = Math.floor((msg[5] - UserDt.LastActivity) / 1000);
              EggBalance = UserDt.EggBalance + seconds * UserDt.Production;
              try {
                if (UserDt.Birds[msg[3]].Max === undefined) {
                  ExistingMax = 0;
                } else {
                  ExistingMax = UserDt.Birds[msg[3]].Max;
                }
              } catch (e) {
                ExistingMax = 0;
              }
              var Cost = parseInt(msg[4]);
              UserDt.EggBalance = EggBalance - Cost;
              UserDt.LastActivity = msg[5];
              try {
                UserDt.Birds[msg[3]].Max = ExistingMax + 1;
              } catch (e) {
                UserDt.Birds[msg[3]] = {
                  Qty: 0,
                  Power: 0,
                  Max: 1
                };
              }
              console.log("new userdata: ", UserDt);
              return _setEntry(context, this.address, JSON.stringify([UserDt]));
            } else if (msg[2] == 2) {
              var ExistingMax, EggBalance;
              var seconds = Math.floor((msg[5] - UserDt.LastActivity) / 1000);
              EggBalance = UserDt.EggBalance + seconds * UserDt.Production;
              try {
                if (UserDt.Piggs[msg[3]].Max === undefined) {
                  ExistingMax = 0;
                } else {
                  ExistingMax = UserDt.Piggs[msg[3]].Max;
                }
              } catch (e) {
                ExistingMax = 0;
              }
              var Cost = parseInt(msg[4]);
              UserDt.EggBalance = EggBalance - Cost;
              UserDt.LastActivity = msg[5];
              try {
                UserDt.Piggs[msg[3]].Max = ExistingMax + 1;
              } catch (e) {
                UserDt.Piggs[msg[3]] = {
                  Qty: 0,
                  Power: 0,
                  Max: 1
                };
              }
              console.log("new userdata: ", UserDt);
              return _setEntry(context, this.address, JSON.stringify([UserDt]));
            } else {
              _toInternalError("Invalid Type");
            }
          } else {
            // console.log(
            //   "Exsting Data",
            //   JSON.parse(new Buffer(data[this.address], "base64").toString())
            // );
            _toInternalError("Invalid Type");
          }
        });
      } else if (Operation === "AttackUser") {
        this.address1 = NAMESPACE + "0011" + hash(msg[1]).substr(0, 58);
        this.address2 = NAMESPACE + "0011" + hash(msg[2]).substr(0, 58);
        return context.getState([this.address1, this.address2]).then(data => {
          if (
            data[this.address1].length !== 0 ||
            data[this.address2].length !== 0
          ) {
            console.log("Inside If in AttackUser");
            let UserDt1 = JSON.parse(
              new Buffer(data[this.address1], "base64").toString()
            )[0];
            let UserDt2 = JSON.parse(
              new Buffer(data[this.address2], "base64").toString()
            )[0];
            var Status, GotEgg, EggBalance1, EggBalance2;
            var seconds1 = Math.floor((msg[3] - UserDt1.LastActivity) / 1000);
            EggBalance1 = UserDt1.EggBalance + seconds1 * UserDt1.Production;
            var seconds2 = Math.floor((msg[3] - UserDt2.LastActivity) / 1000);
            EggBalance2 = UserDt2.EggBalance + seconds2 * UserDt2.Production;
            if (UserDt1.Attack >= UserDt2.Defence) {
              if (EggBalance2 >= UserDt1.Attack) {
                EggBalance2 = EggBalance2 - UserDt1.Attack;
                EggBalance1 = EggBalance1 + UserDt1.Attack;
                GotEgg = UserDt1.Attack;
              } else {
                EggBalance1 = EggBalance1 + EggBalance2;
                GotEgg = EggBalance2;
                EggBalance2 = 0;
              }
              Status = "Attack Successful Enemy Injured, You Got ";
            } else {
              GotEgg = 0;
              Status = "Attack Unsuccessful Enemy Defended, You Got ";
            }
            Status = Status + GotEgg + " Eggs";
            console.log("Status :", Status);
            UserDt1.EggBalance = EggBalance1;
            UserDt2.EggBalance = EggBalance2;
            UserDt1.LastActivity = msg[3];
            UserDt2.LastActivity = msg[3];
            UserDt1.LastAttacked = msg[3];
            UserDt2.LastAttacked = msg[3];
            UserDt1.NoAttacks = UserDt1.NoAttacks + 1;
            var TransactioID = transactionProcessRequest.signature;
            UserDt1.Attacklogs[UserDt1.NoAttacks] = TransactioID;
            context.addReceiptData(Buffer.from(Status, "utf8"));
            return _setEntries(
              context,
              [this.address1, this.address2],
              [JSON.stringify([UserDt1]), JSON.stringify([UserDt2])]
            );
          } else {
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
