const router = require("express").Router();
const authRoutes = require("./auth");
const carRoutes = require("./car");
const userRoutes = require("./user");

// Authentication Routes
router.use("/auth", authRoutes);

// Private Routes
router.use("/car", carRoutes);
router.use("/user", userRoutes);

module.exports = router;
