const { createHash } = require("crypto");
const { CryptoFactory, createContext } = require("sawtooth-sdk/signing");
const fs = require("fs");
const fetch = require("node-fetch");
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");
const protobuf = require("sawtooth-sdk/protobuf");

const REST_URL = "http://rest-api:8008";

const FAMILY = "OracleTP";
const Version = "1.0";

var encoder = new TextEncoder("utf8");
var decoder = new TextDecoder("utf8");

const OraclePrvKey =
  "3faa9545b9a9888c18906e6d8f470acd0ac227a9435e8008043b3f05b231225a";
//const OraclePubKey = "03476df45730e45b8fd1b5c8c2856bd25767840153d8aaa588b70b2bf744b94db8"

function hash(v) {
  //return hash
  return createHash("sha512")
    .update(v)
    .digest("hex");
}

class OracleService {
  constructor() {
    //create signer, public key and get address
    const context = createContext("secp256k1");
    const secp256k1pk = Secp256k1PrivateKey.fromHex(OraclePrvKey.trim());
    this.signer = new CryptoFactory(context).newSigner(secp256k1pk);
    this.publicKey = this.signer.getPublicKey().asHex();
  }

  ClaimGift(data) {
    let StateAdd =
      hash(FAMILY).substr(0, 8) + "0011" + hash(data).substr(0, 58);
    var time = Date.now();
    var payload = JSON.stringify(["NewUser", data, time]);
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(
      this.publicKey,
      this.signer,
      payloadBytes,
      [StateAdd],
      [StateAdd]
    );
  }
  BuyUnit(data) {
    let StateAdd =
      hash(FAMILY).substr(0, 8) + "0011" + hash(data[0]).substr(0, 58);
    data.pop();
    var time = Date.now();
    data.push(time);
    data.unshift("BuyUnit");
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(
      this.publicKey,
      this.signer,
      payloadBytes,
      [StateAdd],
      [StateAdd]
    );
  }
  BuyPower(data) {
    let StateAdd =
      hash(FAMILY).substr(0, 8) + "0011" + hash(data[0]).substr(0, 58);
    data.pop();
    var time = Date.now();
    data.push(time);
    data.unshift("BuyPower");
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(
      this.publicKey,
      this.signer,
      payloadBytes,
      [StateAdd],
      [StateAdd]
    );
  }
  BuyMax(data) {
    let StateAdd =
      hash(FAMILY).substr(0, 8) + "0011" + hash(data[0]).substr(0, 58);
    data.pop();
    var time = Date.now();
    data.push(time);
    data.unshift("BuyMax");
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(
      this.publicKey,
      this.signer,
      payloadBytes,
      [StateAdd],
      [StateAdd]
    );
  }
  AttackUser(data) {
    let StateAdd1 =
      hash(FAMILY).substr(0, 8) + "0011" + hash(data[0]).substr(0, 58);
    let StateAdd2 =
      hash(FAMILY).substr(0, 8) + "0011" + hash(data[1]).substr(0, 58);
    data.pop();
    var time = Date.now();
    data.push(time);
    data.unshift("AttackUser");
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(
      this.publicKey,
      this.signer,
      payloadBytes,
      [StateAdd1, StateAdd2],
      [StateAdd1, StateAdd2]
    );
  }
}

function TransactionBuild(PublicKey, Signer, payloadBytes, Input, Output) {
  const payloadBytesHash = hash(payloadBytes);
  const transactionHeaderBytes = protobuf.TransactionHeader.encode({
    //transaction header components
    familyName: FAMILY,
    familyVersion: Version,
    inputs: Input,
    outputs: Output,
    signerPublicKey: PublicKey,
    batcherPublicKey: PublicKey,
    dependencies: [],
    payloadSha512: payloadBytesHash
  }).finish();
  const signature = Signer.sign(transactionHeaderBytes);

  const transaction = protobuf.Transaction.create({
    //assign header, header signature and payload here
    header: transactionHeaderBytes,
    headerSignature: signature,
    payload: payloadBytes
  });

  const transactions = [transaction];
  const batchHeaderBytes = protobuf.BatchHeader.encode({
    //Batch header components here
    signerPublicKey: Signer.getPublicKey().asHex(),
    transactionIds: transactions.map(txn => txn.headerSignature)
  }).finish();

  const batchSignature = Signer.sign(batchHeaderBytes);
  const batch = protobuf.Batch.create({
    //batch components here
    header: batchHeaderBytes,
    headerSignature: batchSignature,
    transactions: transactions
  });

  const batchListBytes = protobuf.BatchList.encode({
    //batchlist
    batches: [batch]
  }).finish();
  return _send_to_rest_api(batchListBytes);
}

async function _send_to_rest_api(batchListBytes) {
  try {
    //code here
    var resp = await fetch(REST_URL + "/batches", {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "Access-Control-Allow-Origin": "*"
      },
      body: batchListBytes
    });
    return resp;
  } catch (error) {
    return error;
  }
}
module.exports.OracleService = OracleService;
