const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    max: 255,
    ref: "User",
  },
  car_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    max: 255,
    ref: "Car",
  },
  car_license_number: {
    type: String,
    required: true,
    max: 255,
  },
  total_rent_bill: {
    type: Number,
    default: 0,
  },
  to_date_time: {
    type: Date,
    default: Date.now(),
  },
  from_date_time: {
    type: Date,
    default: Date.now(),
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
