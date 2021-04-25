const statusCode = require("../helpers/statusCode");
const User = require("../models/User");
const { encodeTokenWithSecret } = require("../helpers/processToken");

const registerUserController = async (req, res) => {
  const { name, mobile, password } = req.body;
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
    });

    return res.status(statusCode.success.code).json({
      error: false,
      message: "User registerd successfully.",
    });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const loginUserController = async (req, res) => {
  const { mobile, password } = req.body;
  try {
    isUserExists = await User.findOne({ mobile });
    if (!isUserExists) {
      return res
        .status(statusCode.notFound.code)
        .json({ error: true, message: "Sorry user not found." });
    }

    if (encodeTokenWithSecret(password) !== isUserExists.password) {
      return res
        .status(statusCode.unauthorised.code)
        .json({ error: true, message: "Wrong username and password." });
    }

    const authToken = encodeTokenWithSecret({
      userId: isUserExists._id,
      isAdmin: isUserExists.is_admin,
    });

    return res.status(statusCode.success.code).json({
      error: false,
      message: "User logged in successfully.",
      authToken: authToken,
    });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

module.exports = {
  loginUserController,
  registerUserController,
};
