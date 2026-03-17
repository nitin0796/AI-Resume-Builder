import UserModel from "../models/User.Model.js";
import ResumeModel from "../models/Resume.Model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// POST: /api/users/register
// user registration
const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res
      .status(201)
      .json({ message: "User registered successfully", token, user: newUser });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(400).json({ message: error.message });
  }
};

// POST: /api/users/login
// user login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    user.password = undefined;

    return res
      .status(200)
      .json({ message: "User logged in successfully", token, user });
  } catch (error) {
    console.error("Error logging in user", error);
    res.status(400).json({ message: error.message });
  }
};

// GET: /api/users/data
// get user by id
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = undefined;

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error getting user by id", error);
    res.status(400).json({ message: error.message });
  }
};

// Get user resume
//GET: /api/users/resume
export const getUserResume = async (req, res) => {
  try {
    const userId = req.userId;
    const resumes = await ResumeModel.find({ userId });

    if (!resumes) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resumes });
  } catch (error) {
    console.error("Error getting user resume", error);
    res.status(400).json({ message: error.message });
  }
};
