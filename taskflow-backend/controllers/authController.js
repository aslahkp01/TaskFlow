import User from "../models/user.js";
import Task from "../models/task.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};

export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const enableOtp = process.env.ENABLE_OTP === 'true';

    if (enableOtp) {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(otp, salt);
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        otp: hashedOtp,
        otpExpires,
        isVerified: false
      });

      try {
        const message = `Your TaskFlow verification code is: ${otp}\nThis code is valid for 10 minutes.`;
        await sendEmail({
          email: user.email,
          subject: 'TaskFlow - Email Verification',
          message
        });

        return res.status(201).json({
          message: "Registration successful. Please check your email for the verification code.",
          email: user.email,
          requiresOtp: true
        });
      } catch (emailError) {
        await User.findByIdAndDelete(user._id);
        console.error("EMAIL ERROR:", emailError);
        return res.status(500).json({ message: "Failed to send email: " + emailError.message });
      }
    } else {
      // Direct signup without OTP
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: true
      });

      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        onboarded: user.onboarded,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id),
        requiresOtp: false
      });
    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      await bcrypt.compare(
        password,
        user.password
      )
    ) {
      if (!user.isVerified) {
        return res.status(401).json({
          message: "Please verify your email to log in",
          requiresVerification: true,
          email: user.email
        });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        onboarded: user.onboarded,
        profilePhoto: user.profilePhoto,
        token: generateToken(user._id)
      });

    } else {

      res.status(401).json({
        message: "Invalid credentials"
      });

    }

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      
      if (req.body.onboarded !== undefined) {
        user.onboarded = req.body.onboarded;
      }
      
      if (req.body.profilePhoto !== undefined) {
        user.profilePhoto = req.body.profilePhoto;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        onboarded: updatedUser.onboarded,
        profilePhoto: updatedUser.profilePhoto,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP is invalid or has expired" });
    }

    const isMatch = await bcrypt.compare(otp, user.otp);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      onboarded: user.onboarded,
      profilePhoto: user.profilePhoto,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcrypt.genSalt(10);
    const hashedOtp = await bcrypt.hash(otp, salt);
    
    user.otp = hashedOtp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const message = `Your new TaskFlow verification code is: ${otp}\nThis code is valid for 10 minutes.`;
    try {
      await sendEmail({
        email: user.email,
        subject: 'TaskFlow - Email Verification',
        message
      });
      res.json({ message: "Verification code resent" });
    } catch (emailError) {
      console.error("RESEND EMAIL ERROR:", emailError);
      res.status(500).json({ message: "Failed to resend email: " + emailError.message });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const exportData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password -otp');
    const tasks = await Task.find({ user: req.user._id });
    
    res.json({
      user,
      tasks,
      exportDate: new Date()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    await Task.deleteMany({ user: req.user._id });
    await User.findByIdAndDelete(req.user._id);
    
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};