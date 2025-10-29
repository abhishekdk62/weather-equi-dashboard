class EquipmentRepository {
  constructor(equipmentModel) {
    this.Equipment = equipmentModel;
  }

  async findByDateRangeAndCity(startDate, endDate, city) {
    const filter = {};
    if (startDate && endDate) {
      filter.date = { 
        $gte: new Date(startDate), 
        $lte: new Date(endDate) 
      };
    } else if (startDate) {
      filter.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      filter.date = { $lte: new Date(endDate) };
    }
    
    if (city) {
      filter.city = city;
    }
    
    return await this.Equipment.find(filter).sort({ date: 1 });
  }

  calculateAverages(data) {
    if (data.length === 0) {
      return { avgCapacity: 0, avgUnits: 0, avgEfficiency: 0 };
    }
    
    const avgCapacity = data.reduce((sum, item) => sum + item.capacity, 0) / data.length;
    const avgUnits = data.reduce((sum, item) => sum + item.units, 0) / data.length;
    const avgEfficiency = data.reduce((sum, item) => sum + item.efficiency, 0) / data.length;
    
    return { 
      avgCapacity: parseFloat(avgCapacity.toFixed(2)), 
      avgUnits: parseFloat(avgUnits.toFixed(2)), 
      avgEfficiency: parseFloat(avgEfficiency.toFixed(2)) 
    };
  }

  async getUniqueCities() {
    return await this.Equipment.distinct('city');
  }
}

module.exports = EquipmentRepository;
