const fs = require("fs");
const path = require("path");

function sendKeyFile(req, res) {
  fs.readFile(
    path.join(__dirname, "../../config/keys/public_key"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(404).json({ msg: "key not found :/ " });
      }
      // removes all the new line the first 26 of the Begin Key and then slices from beggining
      // till end key statement which is 24 chars long
      const formatedKey = data
        .replace(/(\r\n|\n|\r)/gm, "")
        .slice(26)
        .slice(0, -24);
      res.json(formatedKey);
    }
  );
}

module.exports = sendKeyFile;
