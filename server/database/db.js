const mongoose = require('mongoose');
require('dotenv').config()

// const connectionString = 'mongodb://192.168.122.97:27017/contract-awards';

const connectionString = `mongodb://darren:${process.env.MONGO_PASSWORD}@192.168.122.37:27017/database2324`;

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
