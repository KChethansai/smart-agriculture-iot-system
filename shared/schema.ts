import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  varchar,
  integer,
  real,
  boolean
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table (required for Replit Auth)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Plant scans table
export const plantScans = pgTable("plant_scans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  imagePath: varchar("image_path"),
  plantName: varchar("plant_name"),
  healthStatus: varchar("health_status"),
  healthScore: real("health_score"),
  soilType: varchar("soil_type"),
  waterRequirements: text("water_requirements"),
  fertilizers: text("fertilizers"),
  growingSeason: varchar("growing_season"),
  marketPrice: real("market_price"),
  recommendations: text("recommendations"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Irrigation plans table
export const irrigationPlans = pgTable("irrigation_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  cropType: varchar("crop_type").notNull(),
  soilType: varchar("soil_type").notNull(),
  moistureLevel: real("moisture_level"),
  waterAmount: real("water_amount"),
  frequency: integer("frequency"),
  schedule: text("schedule"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Field layouts table
export const fieldLayouts = pgTable("field_layouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  name: varchar("name").notNull(),
  length: real("length").notNull(),
  width: real("width").notNull(),
  soilType: varchar("soil_type").notNull(),
  cropType: varchar("crop_type").notNull(),
  farmingGoal: varchar("farming_goal").notNull(),
  layoutData: jsonb("layout_data"),
  efficiency: real("efficiency"),
  createdAt: timestamp("created_at").defaultNow(),
});

// AI chat history table
export const chatHistory = pgTable("chat_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact form submissions table
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  subject: varchar("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Newsletter subscriptions table
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  subscribed: boolean("subscribed").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertPlantScanSchema = createInsertSchema(plantScans).omit({ id: true, createdAt: true });
export const insertIrrigationPlanSchema = createInsertSchema(irrigationPlans).omit({ id: true, createdAt: true });
export const insertFieldLayoutSchema = createInsertSchema(fieldLayouts).omit({ id: true, createdAt: true });
export const insertChatHistorySchema = createInsertSchema(chatHistory).omit({ id: true, createdAt: true });
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({ id: true, createdAt: true });
export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({ id: true, createdAt: true });

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertPlantScan = z.infer<typeof insertPlantScanSchema>;
export type PlantScan = typeof plantScans.$inferSelect;
export type InsertIrrigationPlan = z.infer<typeof insertIrrigationPlanSchema>;
export type IrrigationPlan = typeof irrigationPlans.$inferSelect;
export type InsertFieldLayout = z.infer<typeof insertFieldLayoutSchema>;
export type FieldLayout = typeof fieldLayouts.$inferSelect;
export type InsertChatHistory = z.infer<typeof insertChatHistorySchema>;
export type ChatHistory = typeof chatHistory.$inferSelect;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
