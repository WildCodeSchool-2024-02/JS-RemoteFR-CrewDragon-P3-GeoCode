const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  readByUser,
  add,
  destroy,
} = require("../../../controllers/bookingActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", readByUser);

// Route to add a new item
router.post("/", add);

// Route to delete a specific item by ID
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
