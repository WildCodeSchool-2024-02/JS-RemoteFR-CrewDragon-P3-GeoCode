// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all brands from the database
    const brands = await tables.brand.readAll();

    // Respond with the brands in JSON format
    res.json(brands);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific brand from the database based on the provided ID
    const brand = await tables.brand.read(req.params.id);

    // If the brand is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the brand in JSON format
    if (brand == null) {
      res.sendStatus(404);
    } else {
      res.json(brand);
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
  // Extract the brand data from the request body
  const brand = req.body;

  try {
    // Insert the brand into the database
    const insertId = await tables.brand.create(brand);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted brand
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
