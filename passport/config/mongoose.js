const mongoose = require('mongoose');

// Connect to the MongoDB database 'carearecamp_placementcell'
mongoose.connect('mongodb://127.0.0.1/Authentication');

// Get the default connection
const db = mongoose.connection;

// Listen for error events on the database connection
db.on('error', console.error.bind(console, 'Error connecting to database:'));

// Once the database connection is open, this callback function will be executed
db.once('open', function () {
    console.log('Successfully connected to database');
});

// Export the database connection for use in other parts of the application
module.exports = db;
