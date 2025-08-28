import {
  users,
  plantScans,
  irrigationPlans,
  fieldLayouts,
  chatHistory,
  contactSubmissions,
  newsletterSubscriptions,
  type User,
  type UpsertUser,
  type InsertPlantScan,
  type PlantScan,
  type InsertIrrigationPlan,
  type IrrigationPlan,
  type InsertFieldLayout,
  type FieldLayout,
  type InsertChatHistory,
  type ChatHistory,
  type InsertContactSubmission,
  type ContactSubmission,
  type InsertNewsletterSubscription,
  type NewsletterSubscription,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Plant scan operations
  createPlantScan(plantScan: InsertPlantScan): Promise<PlantScan>;
  getUserPlantScans(userId: string): Promise<PlantScan[]>;
  getPlantScan(id: string): Promise<PlantScan | undefined>;
  
  // Irrigation plan operations
  createIrrigationPlan(plan: InsertIrrigationPlan): Promise<IrrigationPlan>;
  getUserIrrigationPlans(userId: string): Promise<IrrigationPlan[]>;
  updateIrrigationPlan(id: string, updates: Partial<InsertIrrigationPlan>): Promise<IrrigationPlan>;
  
  // Field layout operations
  createFieldLayout(layout: InsertFieldLayout): Promise<FieldLayout>;
  getUserFieldLayouts(userId: string): Promise<FieldLayout[]>;
  getFieldLayout(id: string): Promise<FieldLayout | undefined>;
  
  // Chat history operations
  createChatHistory(chat: InsertChatHistory): Promise<ChatHistory>;
  getUserChatHistory(userId: string): Promise<ChatHistory[]>;
  
  // Contact operations
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Newsletter operations
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
}

export class DatabaseStorage implements IStorage {
  // User operations (required for Replit Auth)
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Plant scan operations
  async createPlantScan(plantScan: InsertPlantScan): Promise<PlantScan> {
    const [scan] = await db.insert(plantScans).values(plantScan).returning();
    return scan;
  }

  async getUserPlantScans(userId: string): Promise<PlantScan[]> {
    return db.select().from(plantScans).where(eq(plantScans.userId, userId)).orderBy(desc(plantScans.createdAt));
  }

  async getPlantScan(id: string): Promise<PlantScan | undefined> {
    const [scan] = await db.select().from(plantScans).where(eq(plantScans.id, id));
    return scan;
  }

  // Irrigation plan operations
  async createIrrigationPlan(plan: InsertIrrigationPlan): Promise<IrrigationPlan> {
    const [irrigationPlan] = await db.insert(irrigationPlans).values(plan).returning();
    return irrigationPlan;
  }

  async getUserIrrigationPlans(userId: string): Promise<IrrigationPlan[]> {
    return db.select().from(irrigationPlans).where(eq(irrigationPlans.userId, userId)).orderBy(desc(irrigationPlans.createdAt));
  }

  async updateIrrigationPlan(id: string, updates: Partial<InsertIrrigationPlan>): Promise<IrrigationPlan> {
    const [plan] = await db.update(irrigationPlans).set(updates).where(eq(irrigationPlans.id, id)).returning();
    return plan;
  }

  // Field layout operations
  async createFieldLayout(layout: InsertFieldLayout): Promise<FieldLayout> {
    const [fieldLayout] = await db.insert(fieldLayouts).values(layout).returning();
    return fieldLayout;
  }

  async getUserFieldLayouts(userId: string): Promise<FieldLayout[]> {
    return db.select().from(fieldLayouts).where(eq(fieldLayouts.userId, userId)).orderBy(desc(fieldLayouts.createdAt));
  }

  async getFieldLayout(id: string): Promise<FieldLayout | undefined> {
    const [layout] = await db.select().from(fieldLayouts).where(eq(fieldLayouts.id, id));
    return layout;
  }

  // Chat history operations
  async createChatHistory(chat: InsertChatHistory): Promise<ChatHistory> {
    const [history] = await db.insert(chatHistory).values(chat).returning();
    return history;
  }

  async getUserChatHistory(userId: string): Promise<ChatHistory[]> {
    return db.select().from(chatHistory).where(eq(chatHistory.userId, userId)).orderBy(desc(chatHistory.createdAt));
  }

  // Contact operations
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contact] = await db.insert(contactSubmissions).values(submission).returning();
    return contact;
  }

  // Newsletter operations
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [newsletter] = await db.insert(newsletterSubscriptions).values(subscription).returning();
    return newsletter;
  }
}

export const storage = new DatabaseStorage();
