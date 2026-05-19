const express = require('express');
const db = require('../database');

const router = express.Router();

// POST /api/orders — place a new order
router.post('/', (req, res) => {
  const { name, email, phone, address, city, postcode, items, total } = req.body;

  if (!name || !email || !phone || !address || !city || !postcode || !items || !total) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must have at least one item' });
  }

  try {
    const result = db.prepare(`
      INSERT INTO orders (name, email, phone, address, city, postcode, items, total)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      name, email, phone, address, city, postcode,
      JSON.stringify(items), total
    );

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      message: 'Order placed successfully',
      order: { ...order, items: JSON.parse(order.items) }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders — get all orders (admin, protected by IP whitelist)
router.get('/', (req, res) => {
  try {
    const orders = db.prepare(
      'SELECT * FROM orders ORDER BY created_at DESC'
    ).all();

    const parsed = orders.map(o => ({ ...o, items: JSON.parse(o.items) }));
    res.json({ orders: parsed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/:id — get a single order
router.get('/:id', (req, res) => {
  try {
    const order = db.prepare(
      'SELECT * FROM orders WHERE id = ?'
    ).get(req.params.id);

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.json({ order: { ...order, items: JSON.parse(order.items) } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);

    if (!order) return res.status(404).json({ error: 'Order not found' });

    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);

    res.json({ message: 'Order status updated', status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;