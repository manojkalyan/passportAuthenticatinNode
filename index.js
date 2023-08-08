// Import required modules
const express = require('express');
const app = express(); // Create an instance of the Express application
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const port = 7006;

const db = require('./config/mongoose');
const bcrypt = require('bcrypt');

app.use(express.urlencoded()); // Parse incoming request bodies
const expressLayouts = require('express-ejs-layouts');
const costumMware = require('./config/middleware');

app.use(cookieParser()); // Parse cookies
app.use(expressLayouts); // Use EJS layouts for rendering views

const session = require('express-session');
const passport = require('passport');
const pasportLocal = require('./config/passport_local');
const googleStrategy = require('./config/passport_google_strategy.js');

app.use(express.static('./assets'));
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', './views'); // Set the views directory

// Configure session middleware
app.use(
  session({
    secret: 'blah', // Secret key used to sign the session ID cookie
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000 // Set the maximum age of the session to 1 hour (in milliseconds)
    },
  })
);

app.use(passport.initialize()); // Initialize passport for authentication
app.use(passport.session()); // Use session-based authentication with passport
app.use(passport.setAuthenticationuser); // Custom middleware to set authenticated user information

app.use(flash()); // Flash messages middleware for displaying flash messages
app.use(costumMware.setflash); // Custom middleware to set flash messages in the response

app.use('/', require('./routes')); // Use the defined routes

// Start the server on the specified port
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running server on port: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
