import express from "express";
import { check } from "express-validator";
// import { registerUser, loginUser, logoutUser, getProtectedResource } from "../controllers/authController.js";
import { registerUser, loginUser, logoutUser, sendResetEmail, requestPasswordReset, verifyResetToken, resetPassword} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Import middleware

const router = express.Router();

// router.get("/protected", authMiddleware, getProtectedResource);

// @route POST /api/auth/signup
router.post(
  "/signup",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
  ],
  registerUser
);

// @route POST /api/auth/login
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

// @route   POST /api/auth/send-reset-email
// @desc    Send password reset email
router.post('/send-reset-email', sendResetEmail); // Use the controller method for this route

router.post("/request-password-reset", requestPasswordReset);

// Verify reset token
router.get('/verify-reset-token/:token', verifyResetToken);

// Reset password
router.post('/reset-password/:token', resetPassword);

// @route POST /api/auth/logout
router.post("/logout", logoutUser);

export default router;
