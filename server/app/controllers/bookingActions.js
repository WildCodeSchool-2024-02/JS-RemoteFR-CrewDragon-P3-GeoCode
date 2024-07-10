// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all bookings from the database
    const bookings = await tables.booking.readAll();

    // Respond with the bookings in JSON format
    res.json(bookings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific booking from the database based on the provided ID
    const booking = await tables.booking.read(req.params.id);

    // If the booking is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the booking in JSON format
    if (booking == null) {
      res.sendStatus(404);
    } else {
      res.json(booking);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the booking data from the request body
  const booking = req.body;
  console.info("coucou controller booking", booking);

  try {
    // Insert the booking into the database
    const insertId = await tables.booking.create(booking);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted booking
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  // edit,
  add,
  // destroy,
};
