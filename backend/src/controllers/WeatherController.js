class WeatherController {
  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  async getWeather(req, res) {
    try {
      const { startDate, endDate, sites } = req.query;
      const result = await this.weatherService.getWeatherData(startDate, endDate, sites);
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

  async getSiteIds(req, res) {
    try {
      const siteIds = await this.weatherService.getAllSiteIds();
      res.status(200).json({
        success: true,
        data: siteIds
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }

  // NEW: Upload CSV
  async uploadCSV(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const result = await this.weatherService.uploadCSV(req.file.path);
      
      res.status(200).json({
        success: true,
        message: 'Weather data uploaded successfully',
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

module.exports = WeatherController;
