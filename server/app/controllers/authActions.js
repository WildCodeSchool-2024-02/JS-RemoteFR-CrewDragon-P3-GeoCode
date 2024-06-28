// Import access to database tables
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByEmail(req.body.email);

    if (user == null || user.password !== req.body.password) {
      res.sendStatus(422);
    } else {
      // Respond with the user in JSON format (but without the hashed password)
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const register = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;
  const car = {
    name: req.body.name,
    image: req.body.image,
    model_id: req.body.model_id,
  };

  try {
    // Insert the user into the database
    const insertId = await tables.user.createWithCar(user, car);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

module.exports = {
  login,
  register,
};
