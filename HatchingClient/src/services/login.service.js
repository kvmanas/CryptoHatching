const { CryptoFactory, createContext } = require("sawtooth-sdk/signing");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");

function GetPubKey(Pkey) {
  try {
    const context = createContext("secp256k1");
    const secp256k1pk = Secp256k1PrivateKey.fromHex(Pkey.trim());
    const signer = new CryptoFactory(context).newSigner(secp256k1pk);
    const publicKey = signer.getPublicKey().asHex();
    return publicKey;
  } catch {
    return 0;
  }
}

export { GetPubKey };
