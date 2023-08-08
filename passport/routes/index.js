// Import required modules
const express = require('express');
const router = express.Router();

// Import employee controller



// Include other routers for different routes
router.use('/user', require('./user'));


// Export the router to be used in the main app file
module.exports = router;
