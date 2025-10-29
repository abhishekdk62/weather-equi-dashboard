class EquipmentController {
  constructor(equipmentService) {
    this.equipmentService = equipmentService;
  }

  async getEquipment(req, res) {
    try {
      const { date, city } = req.query;
      const result = await this.equipmentService.getEquipmentData(date, city);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }

  async getCities(req, res) {
    try {
      const cities = await this.equipmentService.getAllCities();
      res.status(200).json({
        success: true,
        data: cities
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }
}

module.exports = EquipmentController;
