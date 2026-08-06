import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";

const DB_PATH: string = process.env.DB_PATH || "data";
const DB_FILE: string = path.join(process.cwd(), DB_PATH, "trail-guide.db");

let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  db = await open({
    filename: DB_FILE,
    driver: sqlite3.Database,
  });
  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
  }
}
