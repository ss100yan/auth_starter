const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Require the secret sauce
const jwtSecret = process.env.JWTSECRET;

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "denied no token" });
  }
  const token = req.headers.authorization.split(" ")[1];
  return jwt.verify(token, jwtSecret, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) {
      return res.status(401).json({ message: "token not valid" });
    }
    const userId = decoded.id;
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).json({ message: "no user found" });
      }
      // pass user details onto next route
      req.user = user;
      return next();
    });
  });
};
