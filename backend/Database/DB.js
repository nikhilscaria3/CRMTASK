// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
 // Connect to the MongoDB Atlas database
      const url = process.env.DB_LOCAL_ATLASURI;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB is connected to Atlas');
      console.log('MongoDB URL:', url);
    
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  }
};

module.exports = connectDB;
