class WeatherService {
  constructor(weatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async getWeatherData(startDate, endDate, sites) {
    try {
      const siteArray = sites ? (Array.isArray(sites) ? sites : [sites]) : [];
      const data = await this.weatherRepository.findByDateRangeAndSites(startDate, endDate, siteArray);
      
      // If multiple sites, calculate averages by date
      if (siteArray.length > 1) {
        const averagedData = this.weatherRepository.calculateAveragesByDate(data);
        return {
          data: averagedData,
          isAveraged: true,
          siteCount: siteArray.length
        };
      }
      
      return {
        data,
        isAveraged: false,
        siteCount: siteArray.length
      };
    } catch (error) {
      throw new Error(`Weather Service Error: ${error.message}`);
    }
  }

  async getAllSiteIds() {
    try {
      return await this.weatherRepository.getUniqueSiteIds();
    } catch (error) {
      throw new Error(`Weather Service Error: ${error.message}`);
    }
  }

}

module.exports = WeatherService;
