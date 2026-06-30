import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  verifyOtp,
  resendOtp,
  exportData,
  deleteAccount
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.put("/profile", protect, updateProfile);
router.get("/export", protect, exportData);
router.delete("/profile", protect, deleteAccount);

export default router;