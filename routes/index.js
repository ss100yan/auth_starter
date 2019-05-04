const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const sendPublicKey = require("../helpers/encryption/sendPublicKey");

// API Routes
router.use("/api", apiRoutes);

// This is separate from all of the other entities so we will have this nonce route here
router.get("/nonce", (req, res) => {
  sendPublicKey(req, res);
});

// If no API routes are hit, send the React app
router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
