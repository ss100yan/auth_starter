const router = require("express").Router();
/**
 * @access Public
 * @desc Tests the pokemon route
 * @route GET api/pokemon/test
 * @returns a 200 and simple pokemon works messages
 */
router.get("/test", (req, res) => {
  res.status("200").json("the pokemon endpoint works");
});

module.exports = router;
