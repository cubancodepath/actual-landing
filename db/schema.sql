CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  locale TEXT DEFAULT 'en',
  created_at TEXT DEFAULT (datetime('now'))
);
