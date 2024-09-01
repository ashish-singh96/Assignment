
const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectToDatabase = () => {
  return mongoose.connect('mongodb://localhost:27017/DBName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
};

// Export the function
module.exports = connectToDatabase;
