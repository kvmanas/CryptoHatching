const { createHash } = require("crypto");
const { CryptoFactory, createContext } = require("sawtooth-sdk/signing");
const fs = require("fs");
const fetch = require("node-fetch");
const { TextEncoder, TextDecoder } = require("text-encoding/lib/encoding");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");
const protobuf = require("sawtooth-sdk/protobuf");

const REST_URL = "http://localhost:4000/api";

const FAMILY = "AdminTP";
const Version = "1.0";

var encoder = new TextEncoder("utf8");
var decoder = new TextDecoder("utf8");

const privateKeyHex =
  "83a6196603b547d02ba39f4b0dc6f6321d25bcc77e79f8877ccea30f19782e24";

function hash(v) {
  //return hash
  return createHash("sha512")
    .update(v)
    .digest("hex");
}

export default class AddUint {
  constructor() {
    //create signer, public key and get address
    const context = createContext("secp256k1");
    const secp256k1pk = Secp256k1PrivateKey.fromHex(privateKeyHex.trim());
    this.signer = new CryptoFactory(context).newSigner(secp256k1pk);
    this.publicKey = this.signer.getPublicKey().asHex();
    this.address =
      hash(FAMILY).substr(0, 6) + hash(this.publicKey).substr(0, 64);
  }

  Production(value) {
    var payload = value;
    const payloadBytes = encoder.encode(payload);
    return TransactionBuild(
      this.publicKey,
      this.signer,
      payloadBytes,
      [this.address],
      [this.address]
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
    var resp = await fetch("http://localhost:4000/api/batches", {
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
