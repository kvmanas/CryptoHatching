const { createHash } = require("crypto");
const { CryptoFactory, createContext } = require("sawtooth-sdk/signing");
const fs = require("fs");
const fetch = require("node-fetch");
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");
const protobuf = require("sawtooth-sdk/protobuf");

const REST_URL = "/api";

const FAMILY = "ClientTP";
const Version = "1.0";

var encoder = new TextEncoder("utf8");
var decoder = new TextDecoder("utf8");

function hash(v) {
  //return hash
  return createHash("sha512")
    .update(v)
    .digest("hex");
}

export default class GameClient {
  constructor(privateKeyHex) {
    //create signer, public key and get address
    const context = createContext("secp256k1");
    const secp256k1pk = Secp256k1PrivateKey.fromHex(privateKeyHex.trim());
    this.signer = new CryptoFactory(context).newSigner(secp256k1pk);
    this.publicKey = this.signer.getPublicKey().asHex();
  }

  ClaimGift() {
    var time = Date.now();
    var payload = JSON.stringify(["NewUser", time]);
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(this.publicKey, this.signer, payloadBytes, [], []);
  }
  BuyUnit(data) {
    var time = Date.now();
    data.unshift("BuyUnit");
    data.push(time);
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    console.log(payloadBytes);
    return TransactionBuild(this.publicKey, this.signer, payloadBytes, [], []);
  }
  BuyPower(data) {
    var time = Date.now();
    data.unshift("BuyPower");
    data.push(time);
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    console.log(payloadBytes);
    return TransactionBuild(this.publicKey, this.signer, payloadBytes, [], []);
  }
  BuyMax(data) {
    var time = Date.now();
    data.unshift("BuyMax");
    data.push(time);
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    console.log(payloadBytes);
    return TransactionBuild(this.publicKey, this.signer, payloadBytes, [], []);
  }
  AttackUser(data) {
    var time = Date.now();
    data.unshift("AttackUser");
    data.push(time);
    var payload = JSON.stringify(data);
    const payloadBytes = encoder.encode(payload);
    console.log(payloadBytes);
    return TransactionBuild(this.publicKey, this.signer, payloadBytes, [], []);
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
