const router = require("express").Router();
const {
  addUserController,
  allUsersController,
  updateUserController,
  deleteUserController,
  userBookingsController,
} = require("../controllers/UserController");

const verifyToken = require("../middlewares/verifyToken");
const validateAdmin = require("../middlewares/validateAdmin");

router.post("/add", verifyToken, validateAdmin, (req, res) => {
  addUserController(req, res);
});

router.get("/all", verifyToken, validateAdmin, (req, res) => {
  allUsersController(req, res);
});

router.post("/update", verifyToken, (req, res) => {
  updateUserController(req, res);
});

router.get("/delete", verifyToken, validateAdmin, (req, res) => {
  deleteUserController(req, res);
});

router.get("/bookings", verifyToken, (req, res) => {
  userBookingsController(req, res);
});

module.exports = router;
