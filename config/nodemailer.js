// Import required modules
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// Create a transporter for sending emails using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'xxxxx',
    pass: 'xxxxxxx'
  }
});

// Function to render an EJS template with provided data
let rendertemplete = (data, relativePath) => {
  let mainHtml;
  
  // Render the EJS template using the provided data
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    data,
    function(err, template) {
      if (err) {
        console.log('Error in rendering', err);
        return;
      }
      mainHtml = template;
    }
  );

  // Return the rendered HTML template
  return mainHtml;
};

// Export the transporter and rendertemplete function for use in other modules
module.exports = {
  transporter: transporter,
  rendertemplete: rendertemplete
};
