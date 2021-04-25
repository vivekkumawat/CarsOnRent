const router = require("express").Router();

const {
  addCarController,
  allCarsController,
  updateCarController,
  deleteCarController,
  searchCarController,
  calculateCarPriceController,
  bookCarController,
  carBookingsController,
} = require("../controllers/CarController");

const verifyToken = require("../middlewares/verifyToken");
const validateAdmin = require("../middlewares/validateAdmin");

router.post("/add", verifyToken, validateAdmin, (req, res) => {
  addCarController(req, res);
});

router.get("/all", verifyToken, (req, res) => {
  allCarsController(req, res);
});

router.post("/update", verifyToken, validateAdmin, (req, res) => {
  updateCarController(req, res);
});

router.get("/delete/:licenseNumber", verifyToken, validateAdmin, (req, res) => {
  deleteCarController(req, res);
});

router.get(
  "/search-cars/:fromDateTime/:toDateTime",
  verifyToken,
  (req, res) => {
    searchCarController(req, res);
  }
);

router.get(
  "/calculate-price/:carId/:fromDateTime/:toDateTime",
  verifyToken,
  (req, res) => {
    calculateCarPriceController(req, res);
  }
);

router.post("/book", verifyToken, (req, res) => {
  bookCarController(req, res);
});

router.get("/bookings", verifyToken, validateAdmin, (req, res) => {
  carBookingsController(req, res);
});

module.exports = router;
