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
const { verifyToken } = require("../../../services/auth");

// Route to get a list of items
router.get("/", browse);

// Route to get a specific item by ID
router.get("/:id", read);

// Route to edit a specific item by ID
router.put("/:id", verifyToken, edit);

// Route to add a new item
router.post("/", verifyToken, add);

// Route to delete a specific item by ID
router.delete("/:id", verifyToken, destroy);

router.post("/upload-csv", verifyToken, uploadCSV.single("csvFile"), uploadCSVHandler);

/* ************************************************************************* */

module.exports = router;
