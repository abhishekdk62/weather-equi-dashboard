const csvtojson = require('csvtojson');
const fs = require('fs');

class CSVValidator {
  async validateAndParseEquipment(filePath) {
    try {
      const data = await csvtojson().fromFile(filePath);
      if (data.length === 0) {
        throw new Error('CSV file is empty');
      }
      const requiredFields = ['name', 'city', 'capacity', 'efficiency', 'units', 'status', 'date'];
      const firstRow = data[0];
      const missingFields = requiredFields.filter(field => !(field in firstRow));
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      const transformedData = data.map((row, index) => {
        const capacity = parseFloat(row.capacity);
        const efficiency = parseFloat(row.efficiency);
        const units = parseFloat(row.units);
        if (isNaN(capacity) || isNaN(efficiency) || isNaN(units)) {
          throw new Error(`Invalid numeric values at row ${index + 2}`);
        }
        if (!['Active', 'Idle', 'Maintenance'].includes(row.status)) {
          throw new Error(`Invalid status at row ${index + 2}. Must be Active, Idle, or Maintenance`);
        }
        const date = new Date(row.date);
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date format at row ${index + 2}`);
        }
        return {
          name: row.name.trim(),
          city: row.city.trim(),
          capacity,
          efficiency,
          units,
          status: row.status,
          date,
          description: row.description || '',
          recommendation: row.recommendation || ''
        };
      });
      this.deleteFile(filePath);
      
      return transformedData;
    } catch (error) {
      this.deleteFile(filePath);
      throw error;
    }
  }

  async validateAndParseWeather(filePath) {
    try {
      const data = await csvtojson().fromFile(filePath);
      if (data.length === 0) {
        throw new Error('CSV file is empty');
      }
      const requiredFields = ['siteId', 'city', 'temperature', 'humidity', 'date', 'timestamp'];
      const firstRow = data[0];
      const missingFields = requiredFields.filter(field => !(field in firstRow));
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      const transformedData = data.map((row, index) => {
        const siteId = parseInt(row.siteId);
        const temperature = parseFloat(row.temperature);
        const humidity = parseFloat(row.humidity);
        if (isNaN(siteId) || isNaN(temperature) || isNaN(humidity)) {
          throw new Error(`Invalid numeric values at row ${index + 2}`);
        }
        if (humidity < 0 || humidity > 100) {
          throw new Error(`Invalid humidity value at row ${index + 2}. Must be between 0-100`);
        }
        const date = new Date(row.date);
        const timestamp = new Date(row.timestamp);
        if (isNaN(date.getTime()) || isNaN(timestamp.getTime())) {
          throw new Error(`Invalid date/timestamp format at row ${index + 2}`);
        }
        return {
          siteId,
          city: row.city.trim(),
          temperature,
          humidity,
          date,
          timestamp
        };
      });
      this.deleteFile(filePath);
      
      return transformedData;
    } catch (error) {
      this.deleteFile(filePath);
      throw error;
    }
  }

  // Delete file helper
  deleteFile(filePath) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // Validate file type
  validateFileType(file) {
    const allowedMimeTypes = ['text/csv', 'application/vnd.ms-excel'];
    const allowedExtensions = ['.csv'];
    
    const ext = file.originalname.toLowerCase().slice(file.originalname.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(file.mimetype)) {
      return { valid: false, message: 'Only CSV files are allowed' };
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, message: 'File size must be less than 10MB' };
    }
    
    return { valid: true };
  }
}

module.exports = new CSVValidator();
