// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CRITICAL: Tells Express to trust reverse proxies so it can accurately parse incoming client IPs
app.set('trust proxy', true);

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const ipWhitelist = require('./middleware/ipWhiteList');

// --- ROUTES ---
// Public Auth endpoints (login and registration)
app.use('/api/auth', require('./routes/auth'));

// IP Whitelisted Admin Routes
app.use('/api/orders', ipWhitelist, require('./routes/orders'));
app.use('/api/products', require('./routes/products'));

// Health Check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));