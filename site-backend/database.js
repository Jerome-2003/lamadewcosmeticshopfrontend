const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'lumadew.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    postcode TEXT NOT NULL,
    items TEXT NOT NULL,
    total REAL NOT NULL,
    status TEXT DEFAULT 'processing',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    desc TEXT,
    accent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed default products if table is empty
const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (productCount.count === 0) {
  const insertProduct = db.prepare(
    'INSERT INTO products (id, name, category, price, desc, accent) VALUES (?, ?, ?, ?, ?, ?)'
  );
  const seedProducts = [
    { id: 'c1', name: 'Cloud Milk Cleanser', category: 'cleanse', price: 28, desc: 'Creamy non-strip wash', accent: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' },
    { id: 'c2', name: 'Gentle Gel Cleanser', category: 'cleanse', price: 25, desc: 'Light and refreshing', accent: 'linear-gradient(145deg, #f0e0c8, #e8d0a0)' },
    { id: 't1', name: 'Dewdrop Serum', category: 'treat', price: 42, desc: 'Plumping hydration veil', accent: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' },
    { id: 't2', name: 'Essence Toner', category: 'treat', price: 38, desc: 'Hydrating essence boost', accent: 'linear-gradient(145deg, #e5e0d0, #d0c8b0)' },
    { id: 'p1', name: 'Cica Sleep Cream', category: 'protect', price: 38, desc: 'Barrier comfort overnight', accent: 'linear-gradient(145deg, #eadfd2, #d8bda0)' },
    { id: 'p2', name: 'Rich Moisturizer', category: 'protect', price: 45, desc: 'Deep nourishing cream', accent: 'linear-gradient(145deg, #f0d5c8, #e0b8a0)' },
  ];
  seedProducts.forEach(p => insertProduct.run(p.id, p.name, p.category, p.price, p.desc, p.accent));
  console.log('Seeded default products');
}

module.exports = db;
