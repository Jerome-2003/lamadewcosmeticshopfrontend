// // const express = require('express');
// // const db = require('../database');

// // const router = express.Router();

// // // POST /api/orders — place a new order
// // router.post('/', (req, res) => {
// //   const { name, email, phone, address, city, postcode, items, total } = req.body;

// //   if (!name || !email || !phone || !address || !city || !postcode || !items || !total) {
// //     return res.status(400).json({ error: 'All fields are required' });
// //   }

// //   if (!Array.isArray(items) || items.length === 0) {
// //     return res.status(400).json({ error: 'Order must have at least one item' });
// //   }

// //   try {
// //     const result = db.prepare(`
// //       INSERT INTO orders (name, email, phone, address, city, postcode, items, total)
// //       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
// //     `).run(
// //       name, email, phone, address, city, postcode,
// //       JSON.stringify(items), total
// //     );

// //     const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(result.lastInsertRowid);

// //     res.status(201).json({
// //       message: 'Order placed successfully',
// //       order: { ...order, items: JSON.parse(order.items) }
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // GET /api/orders — get all orders (admin, protected by IP whitelist)
// // router.get('/', (req, res) => {
// //   try {
// //     const orders = db.prepare(
// //       'SELECT * FROM orders ORDER BY created_at DESC'
// //     ).all();

// //     const parsed = orders.map(o => ({ ...o, items: JSON.parse(o.items) }));
// //     res.json({ orders: parsed });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // GET /api/orders/:id — get a single order
// // router.get('/:id', (req, res) => {
// //   try {
// //     const order = db.prepare(
// //       'SELECT * FROM orders WHERE id = ?'
// //     ).get(req.params.id);

// //     if (!order) return res.status(404).json({ error: 'Order not found' });

// //     res.json({ order: { ...order, items: JSON.parse(order.items) } });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // PATCH /api/orders/:id/status — update order status
// // router.patch('/:id/status', (req, res) => {
// //   const { status } = req.body;
// //   const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

// //   if (!validStatuses.includes(status)) {
// //     return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
// //   }

// //   try {
// //     const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);

// //     if (!order) return res.status(404).json({ error: 'Order not found' });

// //     db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);

// //     res.json({ message: 'Order status updated', status });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // module.exports = router;

// const express = require('express');
// const Product = require('../models/Product');
// const { authMiddleware } = require('../middleware/auth');

// const router = express.Router();
// const VALID_CATEGORIES = ['cleanse', 'treat', 'protect'];

// // GET /api/products — get all products (public)
// router.get('/', async (req, res) => {
//   try {
//     const { category } = req.query;
//     const filter = {};

//     if (category) {
//       if (!VALID_CATEGORIES.includes(category)) {
//         return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
//       }
//       filter.category = category;
//     }

//     const products = await Product.find(filter).sort({ created_at: 1 });
//     res.json({ products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET /api/products/:id — get a single product (public)
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findOne({ id: req.params.id });
//     if (!product) return res.status(404).json({ error: 'Product not found' });
//     res.json({ product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // POST /api/products — add a new product (protected)
// router.post('/', authMiddleware, async (req, res) => {
//   const { id, name, category, price, desc, accent } = req.body;

//   if (!id || !name || !category || !price) {
//     return res.status(400).json({ error: 'id, name, category and price are required' });
//   }

//   if (!VALID_CATEGORIES.includes(category)) {
//     return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
//   }

//   if (typeof price !== 'number' || price <= 0) {
//     return res.status(400).json({ error: 'Price must be a positive number' });
//   }

//   try {
//     const existing = await Product.findOne({ id });
//     if (existing) {
//       return res.status(409).json({ error: `Product with id "${id}" already exists` });
//     }

//     const product = await Product.create({ id, name, category, price, desc, accent });
//     res.status(201).json({ message: 'Product added', product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // PATCH /api/products/:id — update a product (protected)
// router.patch('/:id', authMiddleware, async (req, res) => {
//   const { name, category, price, desc, accent } = req.body;

//   if (category && !VALID_CATEGORIES.includes(category)) {
//     return res.status(400).json({ error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` });
//   }

//   if (price !== undefined && (typeof price !== 'number' || price <= 0)) {
//     return res.status(400).json({ error: 'Price must be a positive number' });
//   }

//   try {
//     const product = await Product.findOneAndUpdate(
//       { id: req.params.id },
//       { $set: { name, category, price, desc, accent } },
//       { new: true, runValidators: true }
//     );

//     if (!product) return res.status(404).json({ error: 'Product not found' });
//     res.json({ message: 'Product updated', product });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // DELETE /api/products/:id — delete a product (protected)
// router.delete('/:id', authMiddleware, async (req, res) => {
//   try {
//     const product = await Product.findOneAndDelete({ id: req.params.id });
//     if (!product) return res.status(404).json({ error: 'Product not found' });
//     res.json({ message: 'Product deleted' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// POST /api/orders — place a new order (public)
router.post('/', async (req, res) => {
  const { name, email, phone, address, city, postcode, items, total } = req.body;

  if (!name || !email || !phone || !address || !city || !postcode || !items || !total) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must have at least one item' });
  }

  try {
    const order = await Order.create({ name, email, phone, address, city, postcode, items, total });
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders — get all orders (admin, protected by IP whitelist)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ created_at: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/orders/:id — get a single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/orders/:id/status — update order status
router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order status updated', status, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;