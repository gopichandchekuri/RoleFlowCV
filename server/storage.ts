import { users, resumes, type User, type InsertUser, type Resume } from "@shared/schema";
import { db, pool } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getResumesByUser(userId: string): Promise<Resume[]>;
  saveResume(userId: string, content: any): Promise<Resume>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getResumesByUser(userId: string): Promise<Resume[]> {
    return await db.select().from(resumes).where(eq(resumes.userId, userId));
  }

  async saveResume(userId: string, content: any): Promise<Resume> {
    const existing = await db.select().from(resumes).where(eq(resumes.userId, userId));
    const title = content.personalInfo?.fullName || "Untitled Resume";

    if (existing.length > 0) {
      const [updated] = await db.update(resumes)
        .set({ content, title, updatedAt: new Date() })
        .where(eq(resumes.userId, userId))
        .returning();
      return updated;
    } else {
      const [inserted] = await db.insert(resumes)
        .values({ userId, content, title })
        .returning();
      return inserted;
    }
  }
}

export const storage = new DatabaseStorage();