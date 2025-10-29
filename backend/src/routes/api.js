const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const container = require('../config/container');
const csvValidator = require('../utils/csvValidator');

const equipmentController = container.get('equipmentController');
const weatherController = container.get('weatherController');

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
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
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Existing routes
router.get('/equipment', (req, res) => equipmentController.getEquipment(req, res));
router.get('/equipment/cities', (req, res) => equipmentController.getCities(req, res));
router.get('/weather', (req, res) => weatherController.getWeather(req, res));
router.get('/weather/sites', (req, res) => weatherController.getSiteIds(req, res));

// NEW: Upload routes
router.post('/equipment/upload', upload.single('file'), (req, res) => 
  equipmentController.uploadCSV(req, res)
);

router.post('/weather/upload', upload.single('file'), (req, res) => 
  weatherController.uploadCSV(req, res)
);
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
  res.status(400).json({
    success: false,
    message: error.message
  });
});

module.exports = router;
