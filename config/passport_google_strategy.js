// Import required modules
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/userSchema');

// Configure Passport to use Google OAuth2Strategy
passport.use(new googleStrategy({
  clientID: "xxxxxxx",
  clientSecret: "xxxxxx",
  callbackURL: "xxxxxxxxx"
},
async function(accessToken, refreshToken, profile, done) {
  try {
    // Check if a user with the same email already exists in the database
    const user = await User.findOne({ email: profile.emails[0].value }).exec();
    
    if (user) {
      // If user exists, return the user's data
      return done(null, user);
    } else {
      // If user doesn't exist, create a new user using Google profile data
      const newUser = await User.create({
        name: profile.displayName,
        email: profile.emails[0].value,
        password: crypto.randomBytes(20).toString('hex') // Generate a random password
      });
      
      return done(null, newUser);
    }
  } catch (err) {
    // Handle any errors that might occur during the process
    console.log('Error in Google strategy', err);
    return;
  }
}));

// Export configured passport for use in other modules
module.exports = passport;
