const router = require("express").Router();
const userRoutes = require("./user");
const pokemonRoutes = require("./pokemon");

// User routes
router.use("/user", userRoutes);

// Pokemon Routes
router.use("/pokemon", pokemonRoutes);

module.exports = router;
