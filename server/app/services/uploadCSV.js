const multer = require("multer");
const path = require("path");

const uploadCSV = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".csv") {
      return cb(new Error("Only CSV files are allowed"));
    }
    cb(null, true);
    return true;
  },
});

module.exports = uploadCSV;
