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

module.exports = mongoose.model('Equipment', equipmentSchema);
