const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  capacity: { type: Number, required: true },
  efficiency: { type: Number, required: true },
  status: { type: String, required: true },
  units: { type: Number, required: true },
  description: String,
  recommendation: String,
  date: { type: Date, required: true }
}, { timestamps: true });

// Compound unique index to prevent duplicates
equipmentSchema.index({ name: 1, city: 1, date: 1 }, { unique: true });

// Indexes for faster queries
equipmentSchema.index({ city: 1 });
equipmentSchema.index({ date: 1 });
equipmentSchema.index({ city: 1, date: 1 });

module.exports = mongoose.model('Equipment', equipmentSchema);
