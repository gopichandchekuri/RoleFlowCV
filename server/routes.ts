import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth"; // Import the auth setup
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // 1. Setup Auth first
  setupAuth(app);

  // 2. Existing Resume Routes
  app.get("/api/resumes", async (req, res) => {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ message: "userId required" });
    const userResumes = await storage.getResumesByUser(userId);
    res.json(userResumes);
  });

  app.post("/api/resumes", async (req, res) => {
    const { userId, content } = req.body;
    const savedResume = await storage.saveResume(userId.toString(), content);
    res.status(200).json(savedResume);
  });

  const httpServer = createServer(app);
  return httpServer;
}