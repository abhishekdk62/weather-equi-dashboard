class EquipmentController {
  constructor(equipmentService) {
    this.equipmentService = equipmentService;
  }

  async getEquipment(req, res) {
    try {
      const { startDate, endDate, city } = req.query;
      const result = await this.equipmentService.getEquipmentData(startDate, endDate, city);
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

  async uploadCSV(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const result = await this.equipmentService.uploadCSV(req.file.path);
      
      res.status(200).json({
        success: true,
        message: 'Equipment data uploaded successfully',
        ...result
      });
    } catch (error) {
      res.status(400).json({ 
        success: false,
        error: error.message 
      });
    }
  }
}

module.exports = EquipmentController;
