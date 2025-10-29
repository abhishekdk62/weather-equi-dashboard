class EquipmentService {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async getEquipmentData(date, city) {
    try {
      const data = await this.equipmentRepository.findByDateAndCity(date, city);
      const summary = this.equipmentRepository.calculateAverages(data);
      
      return {
        summary,
        tableData: data,
        count: data.length
      };
    } catch (error) {
      throw new Error(`Equipment Service Error: ${error.message}`);
    }
  }
 
  async getAllCities() {
    try {
      return await this.equipmentRepository.getUniqueCities();
    } catch (error) {
      throw new Error(`Equipment Service Error: ${error.message}`);
    }
  }

}

module.exports = EquipmentService;
