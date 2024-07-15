const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  readByUser,
  readByCar,
  add,
  edit,
  destroy,
} = require("../../../controllers/carActions");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/user/:id", readByUser);

router.get("/:car", readByCar);

// Route to edit a specific item by ID
router.put("/:id", edit);

// Route to add a new item
router.post("/", add);

// Route to delete a specific item by ID
router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
