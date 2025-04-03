import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/User.js";
import dotenv from "dotenv";
import { sendEmail } from '../utils/mailer.js'; // Import the mailer function

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// @desc Register a new user

export const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
  
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: "User already exists" });
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "Reader" // Default role is "Reader"
      });
  
      await user.save();
  
      const payload = { user: { id: user.id, role: user.role } };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  
      res.cookie("token", token, { httpOnly: true }).json({ token });
    //   res.json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };

// @desc Authenticate user & set JWT token in HTTP-only cookie
export const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    res.json({ msg: "Logged in successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @desc Generate reset token, store in DB, and send reset email
const generateResetTokenAndSendEmail = async (user) => {
    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    console.log("Generated Reset Token:", resetToken); // Debug log
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
    // Store the hashed token and expiry time in the database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour

    console.log("Before Saving User:", user); // Debug log
    await user.save();
    console.log("After Saving User:", user); // Debug log to check if it saves

    // Send reset email
    const resetUrl = `http://localhost:5137/reset-password/${resetToken}`;
    console.log("Generated Reset URL:", resetUrl);

    const message = `
      <h2>Password Reset Request</h2>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
    `;
    
    await sendEmail(user.email, "Password Reset Request", "Click the link below to reset your password.", resetUrl);
  };
  
  export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Reuse the refactored function to generate token and send email
      await generateResetTokenAndSendEmail(user);
  
      res.json({ msg: "Password reset link sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
  export const sendResetEmail = async (req, res) => {
    const { email } = req.body; // Email from the request body
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      // Reuse the refactored function to generate token and send email
      await generateResetTokenAndSendEmail(user);
  
      res.json({ msg: "Password reset link sent to email" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  
// @desc Verify reset token
// @route GET /api/auth/verify-reset-token/:token
export const verifyResetToken = async (req, res) => {
    const { token } = req.params;
  
    try {
      // Hash the token to compare it with the stored hashed token
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
      // Find user with matching token and ensure it's not expired
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }, // Token is valid if not expired
      });
  
      if (!user) {
        return res.status(400).json({ msg: "Invalid or expired token" });
      }
  
      res.json({ msg: "Token is valid", userId: user.id });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };

// @desc Reset password
// @route POST /api/auth/reset-password/:token
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body; // New password from the request

    console.log("Received token:", token);
    console.log("Hashed token:", crypto.createHash("sha256").update(token).digest("hex"));

    try {
      // Hash the token to compare with the stored hashed token
      const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
      // Find user with matching token and ensure it's not expired
      const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }, // Token is valid if not expired
      });
  
      if (!user) {
        return res.status(400).json({ msg: "Invalid or expired token" });
      }
  
      // Hash the new password and save it
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      user.password = hashedPassword; // Update the password
    //   user.resetPasswordToken = undefined; // Clear reset token after password reset
    //   user.resetPasswordExpires = undefined; // Clear expiration time
      user.resetPasswordToken = null; // Set to null instead of undefined
      user.resetPasswordExpires = null; // Set to null instead of undefined
  
      await user.save();
  
      res.json({ msg: "Password has been reset successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };  

// @desc Logout user by clearing JWT cookie
export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json({ msg: "Logged out successfully" });
};
