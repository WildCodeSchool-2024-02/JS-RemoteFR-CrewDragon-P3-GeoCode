// Import access to database tables
const jwt = require("jsonwebtoken");

const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.user.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.user.read(req.params.id);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

//  The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the user data from the request body and params
  const user = { ...req.body, id: req.body.sub };
  try {
    // Update the user in the database
    await tables.user.update(user);
    // Respond with HTTP 204 (No Content)
    console.info("coucou from edit controller", user);

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role_id,
        firstname: user.firstname,
        lastname: user.lastname,
        avatar: user.avatar,
      },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    res.clearCookie("authData");

    res.cookie("authData", token, {
      maxAge: 3600000,
    });

    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    res.sendStatus(520);
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;
  try {
    // Insert the user into the database
    const insertId = await tables.user.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the user from the database

    await tables.user.delete(req.params.id);

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
