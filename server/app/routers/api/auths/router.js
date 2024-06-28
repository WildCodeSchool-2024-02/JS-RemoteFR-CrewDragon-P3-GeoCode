const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login, register } = require("../../../controllers/authActions");

// Route to add a new item
router.post("/", login);

router.post("/register", register);

/* ************************************************************************* */

module.exports = router;
