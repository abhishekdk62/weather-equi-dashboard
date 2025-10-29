const mongoose = require('mongoose');
require('dotenv').config();
const Equipment = require('./src/models/Equipment');
const Weather = require('./src/models/Weather');

const equipmentData = require('./equipment_data.json');
const weatherData = require('./weather_data.json');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected for Seeding');

    // Clear existing data
    await Equipment.deleteMany({});
    await Weather.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Equipment.insertMany(equipmentData);
    console.log(`✅ Inserted ${equipmentData.length} equipment records`);

    await Weather.insertMany(weatherData);
    console.log(`✅ Inserted ${weatherData.length} weather records`);

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
