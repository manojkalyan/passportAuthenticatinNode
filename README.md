# User Authentication System with Social Auth and Password Reset

This is a user authentication system implemented using Node.js, Express, Passport, and MongoDB. The system allows users to sign up, sign in using social authentication (Google), reset their passwords with an email expiration link, and update their profiles.

## Features

- User sign up and sign in
- Social authentication (Google OAuth2)
- Password reset with email expiration link
- User profile update
## Dependencies

   -"bcrypt": "^5.1.0",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.6",
    "crypto": "^1.0.1",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-ejs-layouts": "^2.5.1",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.1",
    "moment": "^2.29.4",
    "mongoose": "^7.4.2",
    "nodemailer": "^6.9.4",
    "passport": "^0.6.0",
    "passport-google-oauth": "^2.0.0",
    "passport-local": "^1.0.0",
    "router": "^1.3.8"

## Folder Structure

- `config` - Configuration files and middleware
  - `mongoose.js` - MongoDB connection configuration
  - `middleware.js` - Custom middleware functions
  - `nodemailer.js` - Nodemailer configuration for sending emails
  - `passport_local.js` - Passport configuration for local authentication
  - `passport_google_strategy.js` - Passport configuration for Google OAuth2 authentication
  
- `controller` - Controllers handling different routes and logic
  - `userController.js` - Controller for user-related routes and actions
  
- `models` - MongoDB models
  - `userSchema.js` - User schema and model
  
- `routes` - Express routes
  - `user.js` - User-related routes and their handling
  
- `views` - EJS templates for rendering views
  - `home.ejs` - Home page template
  - `signin.ejs` - Sign in page template
  - `signup.ejs` - Sign up page template
  - ...

- `assets` - Static assets (CSS, images, etc.)

- `app.js` - Main application file

- `package.json` - Project dependencies and scripts


user-authentication-system/
├── assets/
├── config/
│   ├── mongoose.js
│   ├── middleware.js
│   ├── nodemailer.js
│   ├── passport_local.js
│   └── passport_google_strategy.js
├── controller/
│   └── userController.js
├── models/
│   └── userSchema.js
├── routes/
│   └── user.js
├── views/
│   ├── home.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   └── ...
├── app.js
├── package.json
└── README.md


# signup form image






![Screenshot (19)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/dca98327-428d-4d1b-984d-686040f00eae)





![Screenshot (20)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/e4734192-8fd4-4bc8-b06c-90ebd06accc7)


# signin image

![Screenshot (21)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/488a0ab9-2450-41fc-9c99-cf7a6503cff9)
# homepage image

![Screenshot (22)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/45e0153e-efd0-4afd-bf07-3d08dccaf4aa)


# enter email to send mail image

![Screenshot (23)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/5c9457c5-6334-4c99-956d-5be24acaf641)

# sent email image with link

![Screenshot (24)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/74eacc71-4d13-464c-80fa-8ef36b798f46)

# reset password image





![Screenshot (25)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/e218c930-817d-426c-aa00-94661c37182e)

# link expire image

![Screenshot (27)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/b01b3039-9106-4f4e-b8dc-00a76189c913)

# password encrypted image



![Screenshot (29)](https://github.com/manojkalyan/passportAuthenticatinNodejs/assets/70328306/2c71b41c-ad9f-45d9-8a27-89fa9b6e8077)




