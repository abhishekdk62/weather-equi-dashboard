const csvValidator = require('../utils/csvValidator');

class EquipmentService {
  constructor(equipmentRepository) {
    this.equipmentRepository = equipmentRepository;
  }

  async getEquipmentData(startDate, endDate, city) {
    try {
      const data = await this.equipmentRepository.findByDateRangeAndCity(startDate, endDate, city);
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

  async uploadCSV(filePath) {
    try {
      const data = await csvValidator.validateAndParseEquipment(filePath);
      const bulkOps = data.map(item => ({
        updateOne: {
          filter: { name: item.name, city: item.city, date: item.date },
          update: { $set: item },
          upsert: true
        }
      }));

      const result = await this.equipmentRepository.Equipment.bulkWrite(bulkOps, { ordered: false });
      
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

module.exports = EquipmentService;
