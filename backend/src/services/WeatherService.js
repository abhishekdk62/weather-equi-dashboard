const csvValidator = require('../utils/csvValidator');

class WeatherService {
  constructor(weatherRepository) {
    this.weatherRepository = weatherRepository;
  }
 
  async getWeatherData(startDate, endDate, sites) {
    try {
      const siteArray = sites ? (Array.isArray(sites) ? sites : [sites]) : [];
      const data = await this.weatherRepository.findByDateRangeAndSites(startDate, endDate, siteArray);
      
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

  // NEW: Upload CSV
  async uploadCSV(filePath) {
    try {
      // Validate and parse CSV
      const data = await csvValidator.validateAndParseWeather(filePath);
      
      // Bulk upsert to avoid duplicates
      const bulkOps = data.map(item => ({
        updateOne: {
          filter: { siteId: item.siteId, date: item.date },
          update: { $set: item },
          upsert: true
        }
      }));

      const result = await this.weatherRepository.Weather.bulkWrite(bulkOps, { ordered: false });
      
      return {
        success: true,
        inserted: result.upsertedCount,
        updated: result.modifiedCount,
        total: data.length
      };
    } catch (error) {
      throw new Error(`CSV Upload Error: ${error.message}`);
    }
  }
}

module.exports = WeatherService;
