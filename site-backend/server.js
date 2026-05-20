// // server.js
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // CRITICAL: Tells Express to trust reverse proxies so it can accurately parse incoming client IPs
// app.set('trust proxy', true);

// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));
// app.use(express.json());

// const ipWhitelist = require('./middleware/ipWhiteList');

// // --- ROUTES ---
// // Public Auth endpoints (login and registration)
// app.use('/api/auth', require('./routes/auth'));

// // Orders:
// // POST is public — any customer can place an order
// // GET/PATCH are admin-only, protected by IP whitelist
// app.post('/api/orders', require('./routes/orders'));
// app.use('/api/orders', ipWhitelist, require('./routes/orders'));

// // Products — public
// app.use('/api/products', require('./routes/products'));

// // Health Check
// app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong' });
// });

// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./database');
const Product = require('./models/Product');

const app = express();
const PORT = process.env.PORT || 3001;

app.set('trust proxy', true);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const ipWhitelist = require('./middleware/ipWhiteList');

// --- ROUTES ---
app.use('/api/auth', require('./routes/auth'));

// Orders: POST is public, GET/PATCH are admin-only (IP whitelist)
app.post('/api/orders', require('./routes/orders'));
app.use('/api/orders', ipWhitelist, require('./routes/orders'));

// Products — public
app.use('/api/products', require('./routes/products'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// Seed default products if none exist
async function seedProducts() {
  const count = await Product.countDocuments();
  if (count === 0) {
    const seedData = [
      { id: 'c1', name: 'Cloud Milk Cleanser', category: 'cleanse', price: 28, desc: 'Creamy non-strip wash', accent: 'linear-gradient(145deg, #f4e5d2, #e9cda9)' },
      { id: 'c2', name: 'Gentle Gel Cleanser', category: 'cleanse', price: 25, desc: 'Light and refreshing', accent: 'linear-gradient(145deg, #f0e0c8, #e8d0a0)' },
      { id: 't1', name: 'Dewdrop Serum', category: 'treat', price: 42, desc: 'Plumping hydration veil', accent: 'linear-gradient(145deg, #dfe8d7, #b9c8a9)' },
      { id: 't2', name: 'Essence Toner', category: 'treat', price: 38, desc: 'Hydrating essence boost', accent: 'linear-gradient(145deg, #e5e0d0, #d0c8b0)' },
      { id: 'p1', name: 'Cica Sleep Cream', category: 'protect', price: 38, desc: 'Barrier comfort overnight', accent: 'linear-gradient(145deg, #eadfd2, #d8bda0)' },
      { id: 'p2', name: 'Rich Moisturizer', category: 'protect', price: 45, desc: 'Deep nourishing cream', accent: 'linear-gradient(145deg, #f0d5c8, #e0b8a0)' },
    ];
    await Product.insertMany(seedData);
    console.log('Seeded default products');
  }
}

// Connect to DB then start server
connectDB().then(async () => {
  await seedProducts();
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});