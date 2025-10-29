const Equipment = require('../models/Equipment');
const Weather = require('../models/Weather');
const EquipmentRepository = require('../repositories/EquipmentRepository');
const WeatherRepository = require('../repositories/WeatherRepository');
const EquipmentService = require('../services/EquipmentService');
const WeatherService = require('../services/WeatherService');
const EquipmentController = require('../controllers/EquipmentController');
const WeatherController = require('../controllers/WeatherController');

class Container {
  constructor() {
    this._services = {};
    this._registerServices();
  }
  _registerServices() {
    this._services.equipmentRepository = new EquipmentRepository(Equipment);
    this._services.weatherRepository = new WeatherRepository(Weather);
    this._services.equipmentService = new EquipmentService(
      this._services.equipmentRepository
    );
    this._services.weatherService = new WeatherService(
      this._services.weatherRepository
    );
    this._services.equipmentController = new EquipmentController(
      this._services.equipmentService
    );
    this._services.weatherController = new WeatherController(
      this._services.weatherService
    );
  }
  get(serviceName) {
    if (!this._services[serviceName]) {
      throw new Error(`Service ${serviceName} not found in container`);
    }
    return this._services[serviceName];
  }
}
const container = new Container();
module.exports = container;
