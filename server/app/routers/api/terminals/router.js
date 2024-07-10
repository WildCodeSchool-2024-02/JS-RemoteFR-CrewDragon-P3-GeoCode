const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import item-related actions
const {
  browse,
  read,
  edit,
  add,
  destroy,
  uploadCSVHandler,
} = require("../../../controllers/terminalActions");
const uploadCSV = require("../../../services/uploadCSV");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to edit a specific item by ID
router.put("/:id", edit);

// Route to add a new item
router.post("/", add);

// Route to delete a specific item by ID
router.delete("/:id", destroy);

router.post("/upload-csv", uploadCSV.single("csvFile"), uploadCSVHandler);

/* ************************************************************************* */

module.exports = router;
