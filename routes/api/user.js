const router = require("express").Router();
const userController = require("../../controllers/userController");
const authCheck = require("../../middleware/authenticationCheck");
const { authenticate, authorization } = require("../../middleware/");

/**
 * @access  Private
 * @desc    Return All users
 * @route   GET api/users/
 * @returns a 200 JSON representation of the current users
 * */
router.get("/", authCheck, (req, res) => {
  userController.getAll(req, res);
});

/**
 * @access  Private
 * @desc    Return current user
 * @route   GET api/users/current
 * @returns a 200 JSON representation of the current user
 * */
router.get("/current", authCheck, (req, res) => {
  res.json({ ...req.user._doc });
});

/**
 * @access  Private
 * @desc    Deletes the specified user
 * @route   DELETE api/users/:id
 * @returns a 200 JSON representation of the current users
 * */
router.delete("/:id", [authenticate, authorization], (req, res) => {
  userController.deleteById(req, res);
});

/**
 * @access  Private
 * @desc    Return The user specified by ID
 * @route   GET api/users/:id
 * @returns a 200 JSON representation of the current users
 * */
router.get("/:id", authenticate, (req, res) => {
  userController.findById(req, res);
});

/**
 * @route   POST api/users/login
 * @desc    logins a guest
 * @access  Public
 * @returns 404 when a user is not found
 * @returns 400 when a password is incorrect
 * @returns 200 when a user is successfully logged send them a bearer token
 * @returns 500 incase of any errors
 **/
router.post("/login", (req, res) => {
  userController.login(req, res);
});

/**
 *@access Public
 *@route POST api/users/register
 *@desc registers a user
 *@returns 409 conflict the request could not be
  completed due to a conflict with the current state of the resource
 *@returns 201 for a new user successfully created
 *@returns 500 some db save error
 *@returns 400 for invalid input on req.body
 */
router.post("/register", (req, res) => {
  userController.register(req, res);
});

/**
 * @access Public
 * @desc Tests the users route
 * @route GET api/users/test
 * @returns a 200 and simple user works messages
 */
router.get("/test", (req, res) => {
  res.status("200").json("the user endpoint works");
});

module.exports = router;
