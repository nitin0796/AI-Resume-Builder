import express from "express";
import {
  enhanceJobDescription,
  enhanceSummary,
  uploadResume,
} from "../controllers/ai.controller.js";
import authenticateToken from "../middlewares/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/enhance-summary", authenticateToken, enhanceSummary);
aiRouter.post("/enhance-job-description", authenticateToken, enhanceJobDescription);
aiRouter.post("/upload-resume", authenticateToken, uploadResume);

export default aiRouter;
