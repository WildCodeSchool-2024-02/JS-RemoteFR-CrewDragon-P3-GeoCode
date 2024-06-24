const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login } = require("../../../controllers/authActions");

// Route to add a new item
router.post("/", login);

/* ************************************************************************* */

module.exports = router;
