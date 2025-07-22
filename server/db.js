const mongoose = require('mongoose')
require('dotenv').config()


const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME

async function connectToDatabase() {
    try {
      await mongoose.connect(`${MONGO_URL}/${DB_NAME}`, {
        
      });
      console.log(`DB connected to ${DB_NAME}`);
    } catch (err) {
      console.log(`Error connecting to database: ${err}`);
    }
  }
  
  connectToDatabase();