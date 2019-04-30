const router = require("express").Router();

/**
 * @access Public
 * @desc Tests the users route
 * @route GET api/users/test
 * @returns a 200 and simple user works messages
 */
router.get("/test", (req, res) => {
  res.status("200").json("the user endpoint works");
});

/**
 *@route POST api/users/register
 *@desc registers a user
 *@access Public
 *@returns 409 conflict the request could not be completed due to a conflict with the current state of the resource
 *@returns 201 for a new user successfully created
 *@returns 500 some db save error
 *@returns 400 for invalid input on req.body
 */
router.post("/register", (req, res) => {});

/**
 * @route POST api/users/login
 * @desc logins a guest
 * @access Public
 * @returns 404 when a user is not found
 * @returns 400 when a password is incorrect
 * @returns 200 when a user is successfully logged send them a bearer token
 * @returns 500 incase of any errors
 **/
router.post("/login", (req, res) => {});

module.exports = router;
