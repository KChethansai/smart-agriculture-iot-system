import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  insertPlantScanSchema,
  insertIrrigationPlanSchema,
  insertFieldLayoutSchema,
  insertChatHistorySchema,
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema,
} from "@shared/schema";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Static file serving for uploads
  app.use('/uploads', express.static(uploadDir));

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Plant scan routes
  app.post('/api/plant-scans', isAuthenticated, upload.single('image'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { plantName, healthStatus, healthScore, soilType, waterRequirements, fertilizers, growingSeason, marketPrice, recommendations } = req.body;
      
      const plantScanData = insertPlantScanSchema.parse({
        userId,
        imagePath: req.file ? `/uploads/${req.file.filename}` : null,
        plantName,
        healthStatus,
        healthScore: healthScore ? parseFloat(healthScore) : null,
        soilType,
        waterRequirements,
        fertilizers,
        growingSeason,
        marketPrice: marketPrice ? parseFloat(marketPrice) : null,
        recommendations,
      });

      const plantScan = await storage.createPlantScan(plantScanData);
      res.json(plantScan);
    } catch (error) {
      console.error("Error creating plant scan:", error);
      res.status(500).json({ message: "Failed to create plant scan" });
    }
  });

  app.get('/api/plant-scans', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const plantScans = await storage.getUserPlantScans(userId);
      res.json(plantScans);
    } catch (error) {
      console.error("Error fetching plant scans:", error);
      res.status(500).json({ message: "Failed to fetch plant scans" });
    }
  });

  app.get('/api/plant-scans/:id', isAuthenticated, async (req: any, res) => {
    try {
      const plantScan = await storage.getPlantScan(req.params.id);
      if (!plantScan) {
        return res.status(404).json({ message: "Plant scan not found" });
      }
      
      // Check if user owns this scan
      const userId = req.user.claims.sub;
      if (plantScan.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(plantScan);
    } catch (error) {
      console.error("Error fetching plant scan:", error);
      res.status(500).json({ message: "Failed to fetch plant scan" });
    }
  });

  // Irrigation plan routes
  app.post('/api/irrigation-plans', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const planData = insertIrrigationPlanSchema.parse({
        ...req.body,
        userId,
      });

      const plan = await storage.createIrrigationPlan(planData);
      res.json(plan);
    } catch (error) {
      console.error("Error creating irrigation plan:", error);
      res.status(500).json({ message: "Failed to create irrigation plan" });
    }
  });

  app.get('/api/irrigation-plans', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const plans = await storage.getUserIrrigationPlans(userId);
      res.json(plans);
    } catch (error) {
      console.error("Error fetching irrigation plans:", error);
      res.status(500).json({ message: "Failed to fetch irrigation plans" });
    }
  });

  app.patch('/api/irrigation-plans/:id', isAuthenticated, async (req: any, res) => {
    try {
      const plan = await storage.updateIrrigationPlan(req.params.id, req.body);
      res.json(plan);
    } catch (error) {
      console.error("Error updating irrigation plan:", error);
      res.status(500).json({ message: "Failed to update irrigation plan" });
    }
  });

  // Field layout routes
  app.post('/api/field-layouts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const layoutData = insertFieldLayoutSchema.parse({
        ...req.body,
        userId,
      });

      const layout = await storage.createFieldLayout(layoutData);
      res.json(layout);
    } catch (error) {
      console.error("Error creating field layout:", error);
      res.status(500).json({ message: "Failed to create field layout" });
    }
  });

  app.get('/api/field-layouts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const layouts = await storage.getUserFieldLayouts(userId);
      res.json(layouts);
    } catch (error) {
      console.error("Error fetching field layouts:", error);
      res.status(500).json({ message: "Failed to fetch field layouts" });
    }
  });

  app.get('/api/field-layouts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const layout = await storage.getFieldLayout(req.params.id);
      if (!layout) {
        return res.status(404).json({ message: "Field layout not found" });
      }
      
      // Check if user owns this layout
      const userId = req.user.claims.sub;
      if (layout.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(layout);
    } catch (error) {
      console.error("Error fetching field layout:", error);
      res.status(500).json({ message: "Failed to fetch field layout" });
    }
  });

  // Chat history routes
  app.post('/api/chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { question } = req.body;

      // TODO: Integrate with actual AI API
      // For now, return a simple response
      const answer = `Thank you for your question: "${question}". Our AI farming assistant would provide detailed guidance here. Please ensure you have configured your AI API key.`;
      
      const chatData = insertChatHistorySchema.parse({
        userId,
        question,
        answer,
      });

      const chat = await storage.createChatHistory(chatData);
      res.json(chat);
    } catch (error) {
      console.error("Error creating chat:", error);
      res.status(500).json({ message: "Failed to process chat" });
    }
  });

  app.get('/api/chat-history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await storage.getUserChatHistory(userId);
      res.json(history);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  // Contact form routes
  app.post('/api/contact', async (req, res) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(submissionData);
      res.json({ message: "Contact form submitted successfully", id: submission.id });
    } catch (error) {
      console.error("Error submitting contact form:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Newsletter subscription routes
  app.post('/api/newsletter', async (req, res) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(subscriptionData);
      res.json({ message: "Successfully subscribed to newsletter", id: subscription.id });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // AI crop health analysis (mock for now - should integrate with actual AI service)
  app.post('/api/analyze-crop', isAuthenticated, upload.single('image'), async (req: any, res) => {
    try {
      // TODO: Integrate with actual AI vision API
      // For now, return mock analysis
      const analysis = {
        plantName: "Tomato Plant",
        healthStatus: "Healthy",
        healthScore: 95,
        diseases: [],
        recommendations: "Continue current care routine. Monitor for early blight symptoms.",
        confidence: 0.92
      };
      
      res.json(analysis);
    } catch (error) {
      console.error("Error analyzing crop:", error);
      res.status(500).json({ message: "Failed to analyze crop" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
