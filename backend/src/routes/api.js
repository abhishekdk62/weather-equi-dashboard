const express = require('express');
const router = express.Router();
const container = require('../config/container');

const equipmentController = container.get('equipmentController');
const weatherController = container.get('weatherController');
router.get('/equipment', (req, res) => equipmentController.getEquipment(req, res));
router.get('/equipment/cities', (req, res) => equipmentController.getCities(req, res));
router.get('/weather', (req, res) => weatherController.getWeather(req, res));
router.get('/weather/sites', (req, res) => weatherController.getSiteIds(req, res));

module.exports = router;
