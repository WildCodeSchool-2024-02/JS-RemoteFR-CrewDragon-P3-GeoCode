// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all terminals from the database
    const terminals = await tables.terminal.readAll();

    // Respond with the terminals in JSON format
    res.json(terminals);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific terminal from the database based on the provided ID
    const terminal = await tables.terminal.read(req.params.id);

    // If the terminal is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the terminal in JSON format
    if (terminal == null) {
      res.sendStatus(404);
    } else {
      res.json(terminal);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//  The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the terminal data from the request body and params
  const terminal = { ...req.body, id: req.params.id };
  console.info(terminal);
  try {
    // Update the terminal in the database
    await tables.terminal.update(terminal);
    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.sendStatus(520);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the terminal data from the request body
  const terminal = req.body;

  try {
    // Insert the terminal into the database
    const insertId = await tables.terminal.create(terminal);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted terminal
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the terminal from the database

    await tables.terminal.delete(req.params.id);

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
  read,
  edit,
  add,
  destroy,
};
