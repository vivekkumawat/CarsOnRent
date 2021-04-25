const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  car_license_number: {
    type: String,
    required: true,
    unique: true,
    max: 255,
  },
  manufacturer: {
    type: String,
    required: true,
    max: 255,
  },
  model: {
    type: String,
    required: true,
  },
  base_price: {
    type: Number,
    required: true,
  },
  price_per_hour: {
    type: Number,
    required: true,
  },
  security_deposite: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Car", carSchema);
