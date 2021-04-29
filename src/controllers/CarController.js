const statusCode = require("../helpers/statusCode");
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const addCarController = async (req, res) => {
  const {
    car_license_number,
    manufacturer,
    model,
    base_price,
    price_per_hour,
    security_deposite,
  } = req.body;
  try {
    const isCarLicenseExists = await Car.findOne({ car_license_number });
    if (isCarLicenseExists) {
      return res
        .status(statusCode.duplicateFound.code)
        .json({ error: true, message: "Car License already exists." });
    }
    await Car.create({
      car_license_number,
      manufacturer,
      model,
      base_price,
      price_per_hour,
      security_deposite,
    });
    return res
      .status(statusCode.success.code)
      .json({ error: false, message: "New car added successfully." });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const allCarsController = async (req, res) => {
  try {
    const allCars = await Car.find({});
    return res
      .status(statusCode.success.code)
      .json({ error: false, cars: allCars });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const updateCarController = async (req, res) => {
  const {
    car_license_number,
    manufacturer,
    model,
    base_price,
    price_per_hour,
    security_deposite,
  } = req.body;

  try {
    const carDetails = await Car.findOne({ car_license_number });
    await Car.findOneAndUpdate(
      { _id: carDetails._id },
      {
        car_license_number,
        manufacturer,
        model,
        base_price,
        price_per_hour,
        security_deposite,
      }
    );
    return res
      .status(statusCode.success.code)
      .json({ error: false, message: "Car details updated successfully." });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const deleteCarController = async (req, res) => {
  const car_license_number = req.params.licenseNumber;
  try {
    const findCarAndDelete = await Car.findOneAndDelete({ car_license_number });
    if (!findCarAndDelete) {
      return res.status(statusCode.notFound.code).json({
        error: false,
        message: "No car found with the given license number.",
      });
    }

    return res
      .status(statusCode.success.code)
      .json({ error: false, message: "Car deleted successfully." });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const searchCarController = async (req, res) => {
  const { fromDateTime, toDateTime } = req.params;

  const startDate = new Date(fromDateTime + "T00:00:00Z");
  const endDate = new Date(toDateTime + "T23:59:59Z");

  try {
    const bookedCars = await Booking.find(
      {
        $or: [
          {
            $and: [
              {
                from_date_time: {
                  $gte: startDate,
                },
              },
              {
                to_date_time: {
                  $lte: endDate,
                },
              },
            ],
            $and: [
              {
                from_date_time: {
                  $lte: startDate,
                },
              },
              {
                to_date_time: {
                  $gte: endDate,
                },
              },
            ],
            $and: [
              {
                from_date_time: {
                  $lte: startDate,
                },
              },
              {
                to_date_time: {
                  $gte: startDate,
                },
              },
            ],
            $and: [
              {
                from_date_time: {
                  $lte: endDate,
                },
              },
              {
                to_date_time: {
                  $gte: endDate,
                },
              },
            ],
          },
        ],
      },
      { car_license_number: 1 }
    );

    console.log(bookedCars);

    const allCars = await Car.find({}, { car_license_number: 1 });

    const availableCars = allCars.filter(function (obj) {
      return !bookedCars.some(function (obj2) {
        return obj.car_license_number == obj2.car_license_number;
      });
    });
    return res.status(statusCode.success.code).json({
      error: false,
      available_cars:
        availableCars.length == 0
          ? "Sorry no cars are available between these dates."
          : availableCars,
    });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const calculateCarPriceController = async (req, res) => {
  const { carId, fromDateTime, toDateTime } = req.params;

  const startDate = new Date(fromDateTime + "T00:00:00Z");
  const endDate = new Date(toDateTime + "T23:59:59Z");

  // Converting string date into hours difference
  const duration = parseInt(Math.abs(startDate - endDate) / 36e5);

  if (duration < 0) {
    return res.status(statusCode.invalidField.code).json({
      ...statusCode.invalidField.reason,
      message: "Please select atleast 1 day.",
    });
  } else if (duration >= 168) {
    return res.status(statusCode.invalidField.code).json({
      ...statusCode.invalidField.reason,
      message: "You can't select more than 7 days.",
    });
  }

  try {
    const {
      price_per_hour,
      security_deposite,
      base_price,
    } = await Car.findOne({ _id: carId });
    const totalRentAmount =
      duration * price_per_hour + base_price + security_deposite;
    return res
      .status(statusCode.success.code)
      .json({ error: false, totalRentAmount });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const bookCarController = async (req, res) => {
  const {
    car_id,
    car_license_number,
    total_rent_bill,
    from_date_time,
    to_date_time,
  } = req.body;

  const startDate = new Date(from_date_time + "T00:00:00Z");
  const endDate = new Date(to_date_time + "T23:59:59Z");
  const { userId } = req.authToken;

  try {
    const isBooked = await Booking.find({
      car_license_number,
      from_date_time: startDate,
      to_date_time: endDate,
    });

    if (isBooked) {
      return res.status(statusCode.duplicateFound.code).json({
        error: true,
        message: "Car is already booked for selected dates.",
      });
    }

    console.log(isBooked);

    await Booking.create({
      car_id,
      user_id: userId,
      car_license_number,
      total_rent_bill,
      from_date_time: startDate,
      to_date_time: endDate,
    });

    return res
      .status(statusCode.success.code)
      .json({ error: false, message: "Your car is booked successfully." });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

const carBookingsController = async (req, res) => {
  const { userId } = req.authToken;

  try {
    const bookingDetails = await Booking.find(
      {
        user_id: userId,
      },
      { _id: 0 }
    ).populate("user_id", { password: 0, is_admin: 0 });

    return res
      .status(statusCode.success.code)
      .json({ error: false, users: bookingDetails });
  } catch (error) {
    return res.status(statusCode.serverFailure.code).json({
      ...statusCode.serverFailure.reason,
      errorMessage: error.message,
    });
  }
};

module.exports = {
  addCarController,
  allCarsController,
  updateCarController,
  deleteCarController,
  searchCarController,
  calculateCarPriceController,
  bookCarController,
  carBookingsController,
};
