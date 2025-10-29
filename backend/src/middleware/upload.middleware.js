const multer = require("multer");
const path = require("path");
const fs = require("fs");
const csvValidator = require("../utils/csvValidator");
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const fileFilter = (req, file, cb) => {
  const validation = csvValidator.validateFileType(file);
  if (!validation.valid) {
    return cb(new Error(validation.message), false);
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, 
});
module.exports = {
  uploadSingle: upload.single("file"),
  uploadMultiple: upload.array("files", 5), // If you need multiple files later
};
