import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a transporter using your email and password from .env
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,    // Your email from .env
      pass: process.env.EMAIL_PASS,    // Your app password from .env
    },
  });
  
  /**
   * Send an email
   * @param {string} to - Recipient email
   * @param {string} subject - Email subject
   * @param {string} text - Plain text message
   * @param {string} resetToken - Reset token to create URL
   */
  export const sendEmail = async (to, subject, text, resetUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html: `<h2>Password Reset Request</h2>
              <p>You requested a password reset. Click the link below to reset your password:</p>
              <p><a href="${resetUrl}" target="_blank">Reset Your Password</a></p>
              <p>This link will expire in 1 hour.</p>`
      };
    
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };
