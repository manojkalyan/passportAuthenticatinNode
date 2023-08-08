const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const passwordmailer = require('../mailers/forgotpasswordMailer');
const bcrypt = require('bcrypt');
const moment = require('moment');
const passport = require('passport');

// Module to display the User Signup Page
module.exports.userSingnUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/home');
  }
  return res.render('userSignUp');
};

// Module to display the User Signin Page
module.exports.userSignIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/home');
  }
  return res.render('userSignIn');
};

// Module to create a new user
module.exports.Create = async function (req, res) {
  if (req.body.password != req.body.confirmpassword) {
    req.flash('error', 'Check email or password');
    console.log('error');
    return res.redirect('back');
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      req.flash('success', 'createdsuccess');
      return res.redirect('/user/signin');
    } else {
      req.flash('error', 'Check email or password');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error in finding or creating user:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Module to create a session (signin)
module.exports.create_session = async function (req, res) {
  req.flash('success', 'Login success');
  return res.redirect('/user/home');
};

// Module to destroy a session (signout)
module.exports.destroysession = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  req.flash('success', 'signout success');
    res.redirect('/user/signin');
  });
};

// Module to display the homepage
module.exports.home = function (req, res) {
  return res.render('home');
};

// Module to get the user profile page
module.exports.Profile = function (req, res) {
  return res.render('userProfile');
};

// Module to send a reset password link to the user's email with an expiring token
module.exports.sendPasswordToEmail = async function (req, res) {
  try {
    const usersId = req.params.id; // Extract the user's ID from req.params.id
    // console.log(usersId);

    // Ensure the user's ID is valid
    if (!usersId) {
        req.flash('error', 'user notfound');

      // console.log('User ID not found in request parameters.');
      return res.status(400).send('Bad Request');
    }

    // Find the user by their ID in the database
    const populatedUser = await User.findById(usersId).populate('name', 'email');

    if (!populatedUser) {
      console.log('User not found.');
      return res.status(404).send('User not found');
    }

    // Generate a unique token with an expiration time of 5 minutes
    const secretKey = 'your_secret_key';
    const token = jwt.sign({ id: populatedUser._id }, secretKey, { expiresIn: '120s' });

    // Construct the reset password link
    const resetPasswordLink = `http://localhost:7006/user/updatepage/${populatedUser._id}/${token}`;

    // Check if the provided email matches the user's email
    if (populatedUser.email === req.body.email) {
      // Send the reset password email to the user
      passwordmailer.newComment({
        email: populatedUser.email,
        resetPasswordLink: resetPasswordLink,
      });

      // Redirect the user to a confirmation page or some other action
      req.flash('success', 'Email sent to your account');
      return res.redirect('/user/home');
    } else {
      req.flash('error', 'Check entered email');
      return res.status(400).send('Bad Request');
    }
  } catch (err) {
    console.log('Error in finding or creating user:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Module to update the user profile with a new password
module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findByIdAndUpdate(req.params.id);
      user.password = req.body.newpassword;
      user.save();
      req.flash('success', 'Successfully updated');
      return res.redirect('back');
    } else {
      req.flash('error', 'Error in updating');
      return res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};

// Module to reset the password and display email input
module.exports.resetpassword = async function (req, res) {
  return res.render('resetpassword');
};

// Module to handle the update page with token verification
module.exports.updatepage = async function (req, res) {
  try {
    const usersId = req.params.id;
    const token = req.params.token;

    // Verify the token to ensure its validity
    const secretKey = 'your_secret_key';
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log('Invalid or expired token:', err);
        return res.status(400).send('Invalid or expired token');
      }

      // Check if the token belongs to the correct user
      if (decoded.id !== usersId) {
        console.log('Invalid token for user:', usersId);
        return res.status(400).send('Invalid token for user');
      }

      // If the token is valid, render the "userProfile" page with a form to reset the password
      return res.render('userProfile', { userId: usersId, token: token });
    });
  } catch (err) {
    console.error('Error in handling update page:', err);
    return res.status(500).send('Internal Server Error');
  }
};
