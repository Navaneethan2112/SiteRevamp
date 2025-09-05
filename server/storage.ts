import { type User, type InsertUser, type Contact, type InsertContact, type Campaign, type InsertCampaign, type Template, type InsertTemplate } from "@shared/schema";
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

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.campaigns = new Map();
    this.templates = new Map();
    
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
}

export const storage = new MemStorage();
