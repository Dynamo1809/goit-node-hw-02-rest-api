const app = require('../app')
const mongoose = require('mongoose')
require('dotenv').config()

const { PORT = 3000, MONGO_URL } = process.env

const start = async () => {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Database connection successful')
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

start()
