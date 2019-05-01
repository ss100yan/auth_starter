require("../config/environment")();
const { User } = require("../models");
const dbConnector = require("../config/db");

dbConnector();

const user = {
  name: "Frank",
  email: "frank@gmail.com",
  password: "password",
  isAdmin: true
};

// comment out the delete to only insert an admin
User.collection.deleteMany({}).then(() => {
  const newUser = new User({
    ...user
  });
  newUser
    .save()
    .then(data => {
      console.log("records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});
