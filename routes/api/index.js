const router = require("express").Router();
const userRoutes = require("./user");
const pokemonRoutes = require("./pokemon");

// User Routes
router.use("/users", userRoutes);

// Pokemon Routes
router.use("/pokemon", pokemonRoutes);

// Failed To Find
router.use("*", (req, res) => {
  res.status(404).json({
    Message: "API Resource not found",
    Resource: `${req.params[0].split("/")[1]}`
  });
});

module.exports = router;
