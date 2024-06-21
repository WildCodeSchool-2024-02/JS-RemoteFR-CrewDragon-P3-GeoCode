const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

// Sample
const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);

// Users
const usersRouter = require("./users/router");

router.use("/users", usersRouter);

// Roles

const rolesRouter = require("./roles/router");

router.use("/roles", rolesRouter);

// Cars

const carsRouter = require("./cars/router");

router.use("/cars", carsRouter);

// Models

const modelsRouter = require("./models/router");

router.use("/models", modelsRouter);

// Brands

const brandsRouter = require("./brands/router");

router.use("/brands", brandsRouter);

// Bookings

const bookingsRouter = require("./bookings/router");

router.use("/bookings", bookingsRouter);

// Terminals

const terminalsRouter = require("./terminals/router");

router.use("/terminals", terminalsRouter);

/* ************************************************************************* */

module.exports = router;
