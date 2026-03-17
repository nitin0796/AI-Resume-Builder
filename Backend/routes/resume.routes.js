import express from "express";
import authenticateToken from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";
import {
  createResume,
  deleteResume,
  getResumeById,
  getResumeByPublicId,
  updateResume,
} from "../controllers/resume.controller.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", authenticateToken, createResume);
resumeRouter.put("/update", upload.single("image"), authenticateToken, updateResume);
resumeRouter.delete("/delete/:id", authenticateToken, deleteResume);
resumeRouter.get("/get/:id", authenticateToken, getResumeById);
resumeRouter.get("/public/:id", getResumeByPublicId);

export default resumeRouter;
