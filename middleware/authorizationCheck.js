const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Require the secret sauce
const jwtSecret = process.env.JWTSECRET;

module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "no user defined please authenticate" });
  }
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "upgrade to admin" });
  }
  return next();
};
