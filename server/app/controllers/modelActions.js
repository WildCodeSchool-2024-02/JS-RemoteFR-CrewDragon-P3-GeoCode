// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all models from the database
    const models = await tables.model.readAll();

    // Respond with the models in JSON format
    res.json(models);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific model from the database based on the provided ID
    const model = await tables.model.read(req.params.id);

    // If the model is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the model in JSON format
    if (model == null) {
      res.sendStatus(404);
    } else {
      res.json(model);
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
  // Extract the model data from the request body
  const model = req.body;

  try {
    // Insert the model into the database
    const insertId = await tables.model.create(model);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted model
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
