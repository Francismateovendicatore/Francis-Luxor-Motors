const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "luxor_motors.db");
let db;

function getDb() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
      id TEXT PRIMARY KEY,
      src TEXT NOT NULL,
      model TEXT NOT NULL,
      manufacturer TEXT NOT NULL,
      valuation TEXT NOT NULL,
      stock TEXT NOT NULL,
      rarity TEXT NOT NULL,
      year TEXT NOT NULL,
      origin TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      drivetrain TEXT NOT NULL,
      transmission TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS car_highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      car_id TEXT NOT NULL,
      highlight TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      car_id TEXT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      status TEXT DEFAULT "pending",
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE SET NULL
    );
  `);
}

module.exports = { getDb };
