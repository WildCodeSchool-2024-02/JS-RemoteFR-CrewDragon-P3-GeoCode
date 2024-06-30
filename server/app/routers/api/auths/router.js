const express = require("express");

const router = express.Router();
const { hashPassword } = require("../../../services/auth");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const { login, register } = require("../../../controllers/authActions");

// Route to add a new item
router.post("/", login);

router.post("/register", hashPassword, register);

/* ************************************************************************* */

module.exports = router;
