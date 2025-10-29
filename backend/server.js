const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./src/routes/api');
const connectDB = require('./src/config/database');

const app = express();
  
app.use(cors({origin:process.env.NODE_ENV=='dev'?process.env.DEV_URL:process.env.PROD_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

connectDB()

app.listen(PORT,()=>{
    console.log(`server is listening on http://localhost:${PORT}`);
    
})

module.exports = app;
