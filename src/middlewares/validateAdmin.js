const statusCode = require("../helpers/statusCode");

module.exports = function validateAdmin(req, res, next) {
  const { isAdmin } = req.authToken;
  try {
    if (!isAdmin) {
      return res
        .status(statusCode.unauthorised.code)
        .json({ error: true, message: "You don't have admin permissions." });
    }
    next();
  } catch (error) {
    return res.status(statusCode.unauthorised.code).json({
      ...statusCode.unauthorised.reason,
      errorMessage: error.message,
    });
  }
};
