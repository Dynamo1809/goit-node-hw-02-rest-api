const mongoose = require('mongoose')
// const { MongoClient } = require('mongodb')
const collections = require('./collections')
console.log('🚀 collections', collections)

const url = process.env.MONGO_URL
// const client = new MongoClient(url)

const connectMongo = async () => {
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Database connection successful')
}

// await client.connect()
// const db = client.db()
// const Contacts = db.collection('contacts')
// const contacts = await Contacts.find({}).toArray()
// collections.Contacts = db.collection('contacts')

module.exports = { connectMongo }
