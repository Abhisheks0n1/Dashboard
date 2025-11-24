const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS dashboards (
      user_id INTEGER PRIMARY KEY,
      config TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )
  `);
});

console.log("Database initialized");
module.exports = db;