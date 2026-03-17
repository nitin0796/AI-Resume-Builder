import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getUserResume,
} from "../controllers/user.controller.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", authenticateToken, getUserById);
userRouter.get("/resumes", authenticateToken, getUserResume);

export default userRouter;
