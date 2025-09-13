import { type User, type InsertUser, type Contact, type InsertContact, type Campaign, type InsertCampaign, type Template, type InsertTemplate, type WhatsAppTemplate, type InsertWhatsAppTemplate } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByAuth0Id(auth0Id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User | undefined>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  getCampaignsByUserId(userId: string): Promise<Campaign[]>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;
  
  getTemplatesByUserId(userId: string): Promise<Template[]>;
  createTemplate(template: InsertTemplate): Promise<Template>;
  
  // WhatsApp Templates - user-specific
  getWhatsAppTemplatesByUserId(userId: string): Promise<WhatsAppTemplate[]>;
  createWhatsAppTemplate(template: InsertWhatsAppTemplate): Promise<WhatsAppTemplate>;
  updateWhatsAppTemplate(id: string, updates: Partial<WhatsAppTemplate>): Promise<WhatsAppTemplate | undefined>;
  getWhatsAppTemplate(id: string): Promise<WhatsAppTemplate | undefined>;
  
  getDashboardStats(userId: string): Promise<{
    messagesSent: number;
    responseRate: string;
    activeContacts: number;
    conversionRate: string;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contacts: Map<string, Contact>;
  private campaigns: Map<string, Campaign>;
  private templates: Map<string, Template>;
  private whatsappTemplates: Map<string, WhatsAppTemplate>;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.campaigns = new Map();
    this.templates = new Map();
    this.whatsappTemplates = new Map();
    
    // Initialize with some demo data
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // Create demo campaigns
    const demoCampaigns: Campaign[] = [
      {
        id: randomUUID(),
        userId: 'demo-user',
        name: 'Welcome Series',
        status: 'active',
        messagesSent: 2456,
        responseRate: '68.5%',
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        userId: 'demo-user',
        name: 'Product Launch',
        status: 'completed',
        messagesSent: 1823,
        responseRate: '72.1%',
        createdAt: new Date(),
      },
    ];

    // Create demo templates
    const demoTemplates: Template[] = [
      {
        id: randomUUID(),
        userId: 'demo-user',
        name: 'Order Confirmation',
        content: 'Your order has been confirmed!',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        userId: 'demo-user',
        name: 'Shipping Update',
        content: 'Your order is on the way!',
        status: 'approved',
        createdAt: new Date(),
      },
    ];

    demoCampaigns.forEach(campaign => this.campaigns.set(campaign.id, campaign));
    demoTemplates.forEach(template => this.templates.set(template.id, template));
    
    // Initialize with your actual approved WhatsApp template
    const demoWhatsAppTemplate: WhatsAppTemplate = {
      id: randomUUID(),
      userId: 'demo-user',
      name: 'welcome_message',
      category: 'MARKETING',
      language: 'en',
      body: 'Welcome to AaraConnect! 🎉\n\nStart growing your business with professional WhatsApp messaging:\n✅ Send bulk campaigns\n✅ Set up AI chatbots\n✅ Track analytics\n\nReady to get started? Visit: {{1}}\n\nReply STOP to opt out.',
      variables: JSON.stringify(['dashboard_url']),
      status: 'APPROVED',
      rejectionReason: null,
      metaTemplateId: 'meta_template_123',
      createdAt: new Date(),
      approvedAt: new Date(),
      lastStatusCheck: new Date(),
    };
    
    this.whatsappTemplates.set(demoWhatsAppTemplate.id, demoWhatsAppTemplate);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByAuth0Id(auth0Id: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.auth0Id === auth0Id,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      id,
      avatar: insertUser.avatar || null,
      plan: insertUser.plan || 'starter',
      twilioAccountSid: insertUser.twilioAccountSid || null,
      twilioAuthToken: insertUser.twilioAuthToken || null,
      twilioPhoneNumber: insertUser.twilioPhoneNumber || null,
      isActive: insertUser.isActive !== undefined ? insertUser.isActive : true,
      twilioVerified: insertUser.twilioVerified !== undefined ? insertUser.twilioVerified : false,
      messagesUsed: insertUser.messagesUsed || 0,
      messagesLimit: insertUser.messagesLimit || 1000,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getCampaignsByUserId(userId: string): Promise<Campaign[]> {
    return Array.from(this.campaigns.values()).filter(
      (campaign) => campaign.userId === userId || campaign.userId === 'demo-user'
    );
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = randomUUID();
    const campaign: Campaign = { 
      ...insertCampaign,
      id,
      status: insertCampaign.status || 'draft',
      messagesSent: insertCampaign.messagesSent || 0,
      responseRate: insertCampaign.responseRate || '0%',
      createdAt: new Date(),
    };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  async getTemplatesByUserId(userId: string): Promise<Template[]> {
    return Array.from(this.templates.values()).filter(
      (template) => template.userId === userId || template.userId === 'demo-user'
    );
  }

  async createTemplate(insertTemplate: InsertTemplate): Promise<Template> {
    const id = randomUUID();
    const template: Template = { 
      ...insertTemplate,
      id,
      status: insertTemplate.status || 'pending',
      createdAt: new Date(),
    };
    this.templates.set(id, template);
    return template;
  }

  async getDashboardStats(userId: string): Promise<{
    messagesSent: number;
    responseRate: string;
    activeContacts: number;
    conversionRate: string;
  }> {
    // Return demo stats
    return {
      messagesSent: 12458,
      responseRate: '68.5%',
      activeContacts: 8924,
      conversionRate: '24.8%',
    };
  }

  // WhatsApp Template Methods
  async getWhatsAppTemplatesByUserId(userId: string): Promise<WhatsAppTemplate[]> {
    return Array.from(this.whatsappTemplates.values()).filter(
      (template) => template.userId === userId || template.userId === 'demo-user'
    );
  }

  async createWhatsAppTemplate(insertTemplate: InsertWhatsAppTemplate): Promise<WhatsAppTemplate> {
    const id = randomUUID();
    const template: WhatsAppTemplate = { 
      ...insertTemplate,
      id,
      category: insertTemplate.category || 'MARKETING',
      language: insertTemplate.language || 'en',
      variables: insertTemplate.variables || null,
      status: insertTemplate.status || 'PENDING',
      rejectionReason: null,
      metaTemplateId: null,
      createdAt: new Date(),
      approvedAt: null,
      lastStatusCheck: new Date(),
    };
    this.whatsappTemplates.set(id, template);
    return template;
  }

  async updateWhatsAppTemplate(id: string, updates: Partial<WhatsAppTemplate>): Promise<WhatsAppTemplate | undefined> {
    const template = this.whatsappTemplates.get(id);
    if (!template) return undefined;
    
    const updatedTemplate = { ...template, ...updates, lastStatusCheck: new Date() };
    this.whatsappTemplates.set(id, updatedTemplate);
    return updatedTemplate;
  }

  async getWhatsAppTemplate(id: string): Promise<WhatsAppTemplate | undefined> {
    return this.whatsappTemplates.get(id);
  }
}

export const storage = new MemStorage();
