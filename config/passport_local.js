const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/userSchema');

// Configure the local strategy for passport authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Field name for the username (in this case, it's 'email')
      passReqToCallback: true // Include the request object as the first argument of the verify callback
    },
    async (req, email, password, done) => {
      try {
        // Find the user by their email in the database
        const user = await User.findOne({ email: email });

        // Check if the user exists and if the password matches
           if (!user || !(await bcrypt.compare(password, user.password))) {
          // If the user is not found or the password is incorrect, return an error
          req.flash('error', 'Invalid email or password');
          console.log('Invalid password');
          return done(null, false);
        }

              

        // If the user is found and the password matches, return the user
        return done(null, user);
      } catch (err) {
        console.log('Error in finding user:', err);
        return done(err);
      }
    }
  )
);

// Serialize the user to store it in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user from the session
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by their ID in the database
    const user = await User.findById(id);

    // Check if the user exists
    if (!user) {
      console.log('User not found');
      return done(null, false);
    }

    // If the user is found, return the user
    return done(null, user);
  } catch (err) {
    console.log('Error in deserializing user:', err);
    return done(err);
  }
});

// Custom middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not authenticated, redirect to the signin page
  console.log('mmmmmmmmmmmmmmmmmmmmmmmmm')
  return res.redirect('/user/signin');
};

// Custom middleware to set the authenticated user in res.locals for use in views
passport.setAuthenticationuser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

// Export the passport configuration module
module.exports = passport;
