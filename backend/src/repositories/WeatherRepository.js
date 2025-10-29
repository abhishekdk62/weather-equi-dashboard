class WeatherRepository {
  constructor(weatherModel) {
    this.Weather = weatherModel;
  }

  async findAll() {
    return await this.Weather.find();
  }

  async findByFilters(filters) {
    return await this.Weather.find(filters).sort({ date: 1 });
  }

  async findByDateRangeAndSites(startDate, endDate, siteIds) {
    const filter = {};
    
    if (startDate && endDate) {
      filter.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    }
    
    if (siteIds && siteIds.length > 0) {
      filter.siteId = { $in: siteIds.map(Number) };
    }
    
    return await this.Weather.find(filter).sort({ date: 1 });
  }

  calculateAveragesByDate(data) {
    const grouped = {};
    
    data.forEach(record => {
      const dateKey = record.date.toISOString().split('T')[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = {
          date: dateKey,
          temperatures: [],
          humidities: []
        };
      }
      grouped[dateKey].temperatures.push(record.temperature);
      grouped[dateKey].humidities.push(record.humidity);
    });
    
    return Object.values(grouped).map(group => ({
      date: group.date,
      avgTemperature: parseFloat((group.temperatures.reduce((a, b) => a + b, 0) / group.temperatures.length).toFixed(2)),
      avgHumidity: parseFloat((group.humidities.reduce((a, b) => a + b, 0) / group.humidities.length).toFixed(2))
    }));
  }

  async insertMany(weatherData) {
    return await this.Weather.insertMany(weatherData);
  }

  async deleteAll() {
    return await this.Weather.deleteMany({});
  }

  async getUniqueSiteIds() {
    return await this.Weather.distinct('siteId');
  }
}

module.exports = WeatherRepository;
