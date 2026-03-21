CREATE TABLE IF NOT EXISTS waitlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  locale TEXT DEFAULT 'en',
  utm_source TEXT DEFAULT NULL,
  utm_medium TEXT DEFAULT NULL,
  utm_campaign TEXT DEFAULT NULL,
  utm_content TEXT DEFAULT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  testflight_invited INTEGER DEFAULT 0,
  unsubscribed INTEGER DEFAULT 0
);
