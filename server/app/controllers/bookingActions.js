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
const readByUser = async (req, res, next) => {
  try {
    // Fetch a specific booking from the database based on the provided ID
    const booking = await tables.booking.readByUser(req.params.id);

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
const destroy = async (req, res, next) => {
  try {
    // Delete the booking from the database

    await tables.booking.delete(req.params.id);

    // Respond with HTTP 204 (No Content)

    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware

    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  readByUser,
  // edit,
  add,
  destroy,
};
