const express = require("express");
const router = express.Router();
const container = require("../config/container");
const { uploadSingle } = require("../middleware/upload.middleware");
const { handleMulterError } = require("../middleware/errorHandler.middleware");

const equipmentController = container.get("equipmentController");
const weatherController = container.get("weatherController");

router.get("/equipment", (req, res) =>
  equipmentController.getEquipment(req, res)
);
router.get("/equipment/cities", (req, res) =>
  equipmentController.getCities(req, res)
);
router.post("/equipment/upload", uploadSingle, (req, res) =>
  equipmentController.uploadCSV(req, res)
);
router.get("/weather", (req, res) => weatherController.getWeather(req, res));
router.get("/weather/sites", (req, res) =>
  weatherController.getSiteIds(req, res)
);
router.post("/weather/upload", uploadSingle, (req, res) =>
  weatherController.uploadCSV(req, res)
);

router.use(handleMulterError);

module.exports = router;
