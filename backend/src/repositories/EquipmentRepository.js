class EquipmentRepository {
  constructor(equipmentModel) {
    this.Equipment = equipmentModel;
  }

  async findAll() {
    return await this.Equipment.find();
  }

  async findByFilters(filters) {
    return await this.Equipment.find(filters);
  }

  async findByDateAndCity(date, city) {
    const filter = {};
    if (date) filter.date = new Date(date);
    if (city) filter.city = city;
    return await this.Equipment.find(filter);
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

  async insertMany(equipmentData) {
    return await this.Equipment.insertMany(equipmentData);
  }

  async deleteAll() {
    return await this.Equipment.deleteMany({});
  }

  async getUniqueCities() {
    return await this.Equipment.distinct('city');
  }
}

module.exports = EquipmentRepository;
