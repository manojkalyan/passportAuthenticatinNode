// Import the nodemailer configuration
const nodeMailer = require('../config/nodemailer');

// Function to send a new comment email notification
exports.newComment = (comment) => {
  console.log(comment); // Log the comment data
  
  // Get the reset password link from the comment object
  const resetPasswordLink = comment.resetPasswordLink;
  
  // Render the HTML template using the comment data
  const htmlString = nodeMailer.rendertemplete(
    { comment: comment },
    '/resetpassword/password.ejs'
  );
  
  console.log(htmlString); // Log the rendered HTML template
  console.log('Inside newcomment mailer', comment);
  
  // Send the email using the nodemailer transporter
  nodeMailer.transporter.sendMail(
    {
      from: 'xxxx@gmail.com', // Sender's email address
      to: comment.email, // Recipient's email address
      subject: 'Reset Password Link', // Email subject
      html: `<p>Click the following link to reset your password: <a href="${resetPasswordLink}">${resetPasswordLink}</a></p>`, // Email content
    },
    (err, info) => {
      if (err) {
        console.log('Error in sending mail', err); // Log any error that occurs during email sending
        return;
      }

      console.log('Message sent', info); // Log the success message if email is sent successfully
      return;
    }
  );
};
