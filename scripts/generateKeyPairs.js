require("../config/environment")();

const { generateKeyPair } = require("crypto");
const fs = require("fs");
const path = require("path");

function writeKey(fileName, key) {
  fs.writeFile(
    path.join(__dirname, `../config/keys/${fileName}`),
    key,
    {
      encoding: "utf8",
      flag: "w"
    },
    err => {
      err
        ? console.log(`failed to write the ${fileName} keys`, err)
        : console.log(`wrote the ${fileName}`);
    }
  );
}

generateKeyPair(
  "rsa",
  {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "spki",
      format: "pem"
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem"
    }
  },
  (err, publicKey, privateKey) => {
    // Handle errors and use the generated key pair.
    if (err) {
      throw new Error("failed to generate keys", err);
    }
    writeKey("public_key", publicKey);
    writeKey("private_key", privateKey);
  }
);
