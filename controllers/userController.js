const { User } = require("../models");
const jwt = require("jsonwebtoken");
const validateLoginInput = require("../helpers/loginValidator");
const validateRegisterInput = require("../helpers/registrationValidator");

// Require the secret sauce
const jwtSecret = process.env.JWTSECRET;

module.exports = {
  getAll: (req, res) => {
    User.find({})
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  },
  findById: (req, res) => {
    User.find({ id: req.params.id })
      .then(user => res.status(200).json(user))
      .catch(err => res.status(500).json(err));
  },
  deleteById: (req, res) => {
    User.deleteOne({ id: req.params.id })
      .then(user =>
        res
          .status(200)
          .json({ message: `deleted the user # ${req.params.id}`, ...user })
      )
      .catch(err => res.status(500).json(err));
  },
  login: (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    //short hand for email:email
    const { email, password } = req.body;
    User.findOne({ email }).then(user => {
      //check for user
      if (!user) {
        errors.user = "User not found";
        return res.status(404).json(errors);
      }
      user
        .comparePassword(password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              name: user.name
            }; // created JWT payload
            jwt.sign(
              payload,
              jwtSecret,
              {
                expiresIn: 720000
              },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            errors.password = "Password incorrect";
            return res.status(400).json(errors);
          }
        })
        .catch(err => {
          console.log(err);
          return res.status("500").json({
            login: "an error has occurred in the login process"
          });
        });
    });
  },
  register: (req, res) => {
    console.log("called");
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log(errors, isValid);
    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email, name, password } = req.body;
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.email = "email already registered";
        return res.status(409).json(errors);
      } else {
        //es6 short hand for name:name, email:email etc.
        const newUser = new User({
          name,
          email,
          password
        })
          .save()
          .then(user => res.status(201).json(user))
          .catch(err => {
            console.log(err);
            return res.status("500").json({
              login: "an error has occurred in the registration process"
            });
          });
      }
    });
  }
};
