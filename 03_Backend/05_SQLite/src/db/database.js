import { open } from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
const DB_FILE = path.join(process.cwd(), "src/db", "blog.db");
let db = null;
export async function connectDB() {
    db = await open({
        filename: DB_FILE,
        driver: sqlite3.Database,
    });
    await db.run(`
    CREATE TABLE IF NOT EXISTS blog_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      teaser TEXT NOT NULL,
      author TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      image TEXT NOT NULL,
      content TEXT NOT NULL
    )
  `);
    return db;
}
export function getDB() {
    if (!db) {
        throw new Error("Database not connected. Call connectDB() first.");
    }
    return db;
}
export async function closeDB() {
    if (db) {
        await db.close();
        db = null;
    }
}
//# sourceMappingURL=database.js.map