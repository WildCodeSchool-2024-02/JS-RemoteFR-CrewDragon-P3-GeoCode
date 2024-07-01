const multer = require("multer");
// const csv = require("csvtojson");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // const timestamp = Date.now();
    const originalName = file.originalname;
    const newName = `${originalName}`;
    cb(null, newName);
  },
});

const upload = multer({ storage });

const uploadCSV = upload.single("file");

//   try {
//     const jsonArray = await csv().fromFile(filePath);
//     console.info("caca", jsonArray);
//     req.jsonArray = jsonArray;
//     console.info(filePath);
//     next();
//   } catch (error) {
//     console.error("Erreur lors de la conversion du fichier CSV:", error);
//     res.status(500).send("Erreur lors de la conversion du fichier CSV.");
//   }
// };

module.exports = {
  uploadCSV,
};
