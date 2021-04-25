const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  is_admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
