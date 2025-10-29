const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  siteId: { type: Number, required: true },
  city: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  date: { type: Date, required: true },
  timestamp: { type: Date, required: true }
}, { timestamps: true });

// Compound unique index to prevent duplicates
weatherSchema.index({ siteId: 1, date: 1 }, { unique: true });

// Indexes for faster queries
weatherSchema.index({ siteId: 1 });
weatherSchema.index({ date: 1 });

module.exports = mongoose.model('Weather', weatherSchema);
