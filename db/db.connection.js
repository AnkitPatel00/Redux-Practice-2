const mongoose = require('mongoose')
const env = require('dotenv')
env.config()
const initializeDatabase = async () => {
  try {
    const connected = await mongoose.connect(process.env.mongo_URI)
    if (connected)
    {
      console.log('Connected Successfully')
    }
  }
  catch (error)
  {
console.error('Connection Failed',error)
  }
}

module.exports = {initializeDatabase}