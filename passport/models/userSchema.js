// Import required modules
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash the password before saving to the database
userSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it's new or modified
    if (this.isModified('password')) {
      const saltRounds = 10; // Number of salt rounds for bcrypt
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (err) {
    next(err);
  }
});

// Create the User model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other modules
module.exports = User;
