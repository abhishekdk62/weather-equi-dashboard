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
}

module.exports = WeatherController;
