class UploadRepository {
  constructor(model) {
    this.Model = model;
  }

  async bulkUpsert(data, uniqueFields) {
    try {
      const bulkOps = data.map(item => ({
        updateOne: {
          filter: this.createFilter(item, uniqueFields),
          update: { $set: item },
          upsert: true
        }
      }));

      const result = await this.Model.bulkWrite(bulkOps, { ordered: false });
      
      return {
        success: true,
        inserted: result.upsertedCount,
        updated: result.modifiedCount,
        total: data.length
      };
    } catch (error) {
      throw new Error(`Bulk upsert failed: ${error.message}`);
    }
  }

  createFilter(item, fields) {
    const filter = {};
    fields.forEach(field => {
      filter[field] = item[field];
    });
    return filter;
  }
}

module.exports = UploadRepository;
