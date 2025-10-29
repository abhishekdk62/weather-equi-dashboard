const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  siteId: { type: Number, required: true },
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  date: { type: Date, required: true },
  timestamp: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Weather', weatherSchema);
