const express = require('express');
const router = express.Router();
const container = require('../config/container');

// Get controllers from container
const equipmentController = container.get('equipmentController');
const weatherController = container.get('weatherController');

// Equipment routes
router.get('/equipment', (req, res) => equipmentController.getEquipment(req, res));
router.get('/equipment/cities', (req, res) => equipmentController.getCities(req, res));

// Weather routes
router.get('/weather', (req, res) => weatherController.getWeather(req, res));
router.get('/weather/sites', (req, res) => weatherController.getSiteIds(req, res));

module.exports = router;
