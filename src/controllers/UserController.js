const statusCode = require("../helpers/statusCode");
const User = require("../models/User");
const Booking = require("../models/Booking");
const { encodeTokenWithSecret } = require("../helpers/processToken");

const addUserController = async (req, res) => {
  const { name, mobile, password, is_admin } = req.body;
  try {
    isUserExists = await User.findOne({ mobile });
    if (isUserExists) {
      return res
        .status(statusCode.duplicateFound.code)
        .json({ error: true, message: "User already exists." });
    }

    const hashedPassword = encodeTokenWithSecret(password);

    await User.create({
      name,
      mobile,
      password: hashedPassword,
      is_admin,
    });

    return res.status(statusCode.success.code).json({
      error: false,
      message: "New user added successfully.",
    });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const allUsersController = async (req, res) => {
  try {
    const allUsers = await User.find({});
    return res
      .status(statusCode.success.code)
      .json({ error: false, users: allUsers });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const updateUserController = async (req, res) => {
  const { name, mobile, password } = req.body;
  const { userId } = req.authToken;

  try {
    await User.findOneAndUpdate({ _id: userId }, { name, mobile, password });
    return res
      .status(statusCode.success.code)
      .json({ error: false, message: "User updated successfully." });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const deleteUserController = async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete({ _id: userId });
    return res
      .status(statusCode.success.code)
      .json({ error: false, message: "User deleted successfully." });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const userBookingsController = async (req, res) => {
  const { userId } = req.authToken;

  try {
    const bookingDetails = await Booking.find(
      { user_id: userId },
      { _id: 0 }
    ).populate("car_id", { date: 0, _id: 0 });

    return res
      .status(statusCode.success.code)
      .json({ error: false, cars: bookingDetails });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

module.exports = {
  addUserController,
  allUsersController,
  updateUserController,
  deleteUserController,
  userBookingsController,
};
