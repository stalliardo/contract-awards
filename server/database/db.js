const mongoose = require('mongoose');

// MongoDB connection string, will need to be dynamic so financial years can be assigned to database names
const connectionString = 'mongodb://192.168.122.97:27017/ContractAwards';

// Connect to MongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
