import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertUserSchema } from "@shared/schema";
import { whatsAppService, WhatsAppService } from "./whatsapp";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse({
        ...req.body,
        userId: req.body.userId || 'anonymous', // Allow anonymous submissions
      });
      
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Get all contacts (admin only)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // User management
  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedData);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/users/:auth0Id", async (req, res) => {
    try {
      const user = await storage.getUserByAuth0Id(req.params.auth0Id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      // For demo purposes, return static data
      // In production, you'd get userId from authenticated session
      const stats = await storage.getDashboardStats('demo-user');
      res.json(stats);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Campaigns
  app.get("/api/campaigns", async (req, res) => {
    try {
      // In production, get userId from authenticated session
      const campaigns = await storage.getCampaignsByUserId('demo-user');
      res.json(campaigns);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Templates
  app.get("/api/templates", async (req, res) => {
    try {
      // In production, get userId from authenticated session
      const templates = await storage.getTemplatesByUserId('demo-user');
      res.json(templates);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // WhatsApp API endpoints
  app.get("/api/whatsapp/templates", async (req, res) => {
    try {
      const templates = whatsAppService.getAvailableTemplates();
      res.json(templates);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/whatsapp/send", async (req, res) => {
    try {
      const { to, templateName, variables } = req.body;
      
      if (!to || !templateName) {
        return res.status(400).json({ message: "Phone number and template name are required" });
      }

      const messageId = await whatsAppService.sendTemplateMessage(to, templateName, variables);
      res.json({ success: true, messageId });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/whatsapp/bulk-send", async (req, res) => {
    try {
      const { phoneNumbers, templateName, variables } = req.body;
      
      if (!phoneNumbers || !Array.isArray(phoneNumbers) || !templateName) {
        return res.status(400).json({ message: "Phone numbers array and template name are required" });
      }

      const results = await whatsAppService.sendBulkMessages(phoneNumbers, templateName, variables);
      res.json({
        success: true,
        results: {
          sent: results.success.length,
          failed: results.failed.length,
          details: results
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // WhatsApp webhook endpoint
  app.post("/api/whatsapp/webhook", async (req, res) => {
    try {
      const incomingMessage = WhatsAppService.processIncomingMessage(req.body);
      
      // Log incoming message for demo
      console.log('Received WhatsApp message:', incomingMessage);
      
      // You can add your custom logic here to handle incoming messages
      // For example, store in database, trigger automated responses, etc.
      
      res.status(200).send('OK');
    } catch (error: any) {
      console.error('Webhook error:', error);
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
