// Import required modules
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import user controller
const userContoller = require('../controller/userController');

// Route to display the signup page for new users
router.get('/signup', userContoller.userSingnUp);

// Route to display the sign-in page for users
router.get('/signIn', userContoller.userSignIn);

// Route to handle user creation
router.post('/create', userContoller.Create);

// Route to handle user session creation using local strategy
router.post('/create_session', passport.authenticate('local', {
    failureRedirect: '/user/signup'
}), userContoller.create_session);

// Route to handle user signout
router.get('/signout', userContoller.destroysession);

// Route to user's home page, requires authentication
router.get('/home', passport.checkAuthentication, userContoller.home);

// Route to send a password reset link via email, requires authentication
router.post('/pass/:id', passport.checkAuthentication, userContoller.sendPasswordToEmail);

// Route to update user information, requires authentication
router.post('/update/:id', passport.checkAuthentication, userContoller.update);

// Route to display user's profile, requires authentication
router.get('/profile', passport.checkAuthentication, userContoller.Profile);

// Route for Google OAuth2 authentication
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback route for Google OAuth2 authentication
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/signin' }), userContoller.create_session);

// Route to initiate the password reset process
router.get("/reset",  passport.checkAuthentication,userContoller.resetpassword);

// Route to display the password update page
router.get('/updatepage/:id/:token', passport.checkAuthentication, userContoller.updatepage);

// Export the router to be used in the main app file
module.exports = router;
