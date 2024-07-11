const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

// Import access to database tables
const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided email
    const user = await tables.user.readByEmailWithPassword(req.body.email);

    if (user == null) {
      res.sendStatus(422);
      // Respond with the user in JSON format (but without the hashed password)
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    if (verified) {
      // Respond with the user in JSON format (but without the hashed password)
      delete user.hashed_password;

      // Generate JWT token
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

      res.cookie("authData", token, {
        maxAge: 3600000,
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(422);
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
